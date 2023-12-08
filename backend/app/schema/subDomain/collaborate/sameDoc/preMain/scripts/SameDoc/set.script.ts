import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import _ from "lodash"
import RealTimeYDocAdapter from "../../../forUsage/adapters/RealTimeYDocAdapter";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import { EntityDocument, SameDoc } from "../../../forUsage/types/RealTimeEntity";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";
import RealTimeColorAdapter from "../../../forUsage/adapters/RealTimeColorPickerAdapter";
import RealTimeFaviconSelectionAdapter from "../../../forUsage/adapters/RealTimeFaviconSelectionAdapter";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { EntityMenuItemType, EntityMenuType, sameDocMenuType, selectAdapter } from "./adaptersFromMenuAndAnswers.script";
import RealTimeColorSelectionAdapter from "../../../forUsage/adapters/RealTimeColorSelectionAdapter";
import RealTimeMediaSelectionAdapter from "../../../forUsage/adapters/RealTimeMediaSelectionAdapter";

export type RealTimeAllAdapters = RealTimeYDocAdapter | RealTimeSwitchAdapter | RealTimePictureSelectionAdapter | RealTimeColorAdapter | RealTimeFaviconSelectionAdapter | RealTimeColorSelectionAdapter | RealTimeMediaSelectionAdapter

export type RealTimeAdapterPropertyValue = {
  name: string,
  adapter: RealTimeAllAdapters
}


type MenuItemAdapterType =
  | {
    header?: string;
    type?: string;
    isShowing?: any;
    data?: any[]
  };

export type sameDocAdapterMenuType = {
  menu: MenuItemAdapterType[];
};

type input = {
  socketId: string
  entity: string,
  properties: RealTimeAdapterPropertyValue[]
  menu?: EntityMenuType
  nonRealTimeProps?: {
    [propName: string]: any;
  },
  userAnswers?: {
    [propName: string]: any;
  }
}

type updateMenuInput = {
  menu?: sameDocMenuType,
  nonRealTimeProps?: any
}

function getTextColorBrightness(color) {
  // Convert hex to RGB
  if (color[0] === '#') {
    color = color.slice(1);
    const bigint = parseInt(color, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    color = `rgb(${r}, ${g}, ${b})`;
  }

  // Get RGB values
  const rgb = color.match(/\d+/g);
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];

  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Check if luminance is above a certain threshold
  return luminance > 128 ? 'DARK' : 'LIGHT';
}


const doesPropertyWithTypeExist = ({ prop, type, entityProps }: {
  prop: string,
  type: string,
  entityProps: {
    [propName: string]: RealTimeAllAdapters;
  },
}) => {

  return entityProps[prop] !== undefined && entityProps[prop].sameDocType === type
}

export default function set(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    // main working area
    const sameDoc: SameDoc = singleton.data.sameDoc
    sameDoc[args.entity] = sameDoc[args.entity] || {};

    //add socket to entity
    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    // so we can remove it on socket disconnect.
    user.data.entities.push(args.entity)

    sameDoc[args.entity].sockets = sameDoc[args.entity].sockets || []
    sameDoc[args.entity].sockets.push(user.data)


    //add properties
    sameDoc[args.entity].props = sameDoc[args.entity].props || {}

    for (let i = 0; i < args.properties.length; i++) {
      const prop = args.properties[i];

      sameDoc[args.entity].props[prop.name] = prop.adapter
    }

    // add non real time props
    sameDoc[args.entity].nonRealTimeProps = args.nonRealTimeProps

    // store user answers
    sameDoc[args.entity].userAnswers = args.userAnswers || {}
    sameDoc[args.entity].updateUserAnswer = async ({ name, value }) => {
      sameDoc[args.entity].userAnswers[name] = value;
    }

    // reset properties
    sameDoc[args.entity].updateMenu = async (args2: updateMenuInput) => {
      let menu: EntityMenuType = {
        menu: []
      }

      if (args2.nonRealTimeProps) {
        sameDoc[args.entity].nonRealTimeProps = {
          ...sameDoc[args.entity].nonRealTimeProps,
          ...args2.nonRealTimeProps,
        }
      }

      for (let i = 0; i < args2.menu.menu.length; i++) {
        const m = args2.menu.menu[i];

        const newMenuItem: EntityMenuItemType = {
          header: m.header,
          type: m.type,
          data: []
        }


        //   if (sameDoc[args.entity].props[prop.name] && sameDoc[args.entity].props[prop.name].sameDocType === prop.adapter.sameDocType) {
        //     continue
        //   }

        //isShowing
        if (m?.isShowing?.prop && !doesPropertyWithTypeExist({
          prop: m.isShowing.prop,
          type: "SWITCH:V1",
          entityProps: sameDoc[args.entity].props,
        })) {
          const adapter = selectAdapter({
            prop: m.isShowing.prop,
            initialValue: true,
            type: "SWITCH:V1",
          })
          sameDoc[args.entity].props[m?.isShowing?.prop] = adapter

          newMenuItem.isShowing = {
            // adapterId: adapter.id,
            name: adapter.name,
          }
        } else if (m?.isShowing?.prop) {
          newMenuItem.isShowing = {
            // adapterId: adapter.id,
            name: m.isShowing.prop,
          }
        }

        for (let x = 0; x < m.data.length; x++) {
          const data = m.data[x];

          if (doesPropertyWithTypeExist({
            prop: data.prop,
            type: data.type,
            entityProps: sameDoc[args.entity].props,
          })) {
            newMenuItem.data.push({
              // adapterId: adapter.id,
              name: data.prop,
            })

            continue
          }
          const adapter = selectAdapter({
            type: data.type,
            prop: data.prop,
            label: data.label,
            isShowing: data.isShowing,
            initialValue: data.defaultValue,
          })

          if (adapter) {

            newMenuItem.data.push({
              // adapterId: adapter.id,
              name: adapter.name,
            })

            sameDoc[args.entity].props[adapter.name] = adapter
          }

        }

        menu.menu.push(newMenuItem)
      }

      sameDoc[args.entity].menu = menu

      return { menu }



      // for (let i = 0; i < newProperties.length; i++) {
      //   const prop = newProperties[i];

      //   if (sameDoc[args.entity].props[prop.name] && sameDoc[args.entity].props[prop.name].sameDocType === prop.adapter.sameDocType) {
      //     continue
      //   }

      //   sameDoc[args.entity].props[prop.name] = prop.adapter
      // }

    }


    // reset properties
    sameDoc[args.entity].getData = () => {
      const props = { ...sameDoc[args.entity].props }
      // let answers = {}

      if (sameDoc[args.entity].menu) {
        const menu: sameDocAdapterMenuType = {
          menu: sameDoc[args.entity].menu.menu.map(m => {
            const newData: MenuItemAdapterType = {
              type: m.type || "CONTAINER:V1",
              header: m.header,
              data: [],
            }

            return newData;
          })
        }

        for (let i = 0; i < sameDoc[args.entity].menu.menu.length; i++) {


          const menuItem = sameDoc[args.entity].menu.menu[i];

          if (menuItem?.isShowing) {

            menu.menu[i].isShowing = props[menuItem.isShowing.name].getData()

            sameDoc[args.entity].userAnswers[menu.menu[i].isShowing.name] = menu.menu[i].isShowing.booleanValue

            delete props[menuItem.isShowing.name]
          }

          if (menuItem?.data?.length) {
            for (let x = 0; x < menuItem.data.length; x++) {
              const component = menuItem.data[x];
              const data = props[component.name]?.getData ? props[component.name]?.getData() : null

              if (data) {

                menu.menu[i].data.push(data)

                switch (data.sameDocType) {
                  case "SWITCH:V1":
                    sameDoc[args.entity].userAnswers[data.name] = (data as any).booleanValue
                    break;

                  case "YDOC:V1":
                    sameDoc[args.entity].userAnswers[data.name] = (data as any).readableTextValue
                    break;

                  case "COLOR_SELECTION:V1":
                    sameDoc[args.entity].userAnswers[data.name] = {

                      color: (data as any).color,
                      suggestedTextColor: getTextColorBrightness((data as any).color),
                    }
                    break;

                  case "MEDIA_SELECTION:V1":
                    sameDoc[args.entity].userAnswers[data.name] = {
                      type: (data as any).selection === "NO_MEDIA" ? "NONE" : "BUILT_IN",
                      url: (data as any).selection === "CURRENT_MEDIA" ? (data as any).currentSelection.media : (data as any).selection,
                    }
                    break;

                  default:
                    break;
                }

                delete props[component.name]

              }
            }
          }
        }

        return {
          menu,
          props,
          answers: sameDoc[args.entity]?.userAnswers,
          nonRealTimeProps: sameDoc[args.entity]?.nonRealTimeProps,
        }

      } else {
        return {
          menu: null,
          props,
          answers: sameDoc[args.entity]?.userAnswers,
          nonRealTimeProps: sameDoc[args.entity]?.nonRealTimeProps,
        }
      }
    }

    // manager sockets for this record.
    sameDoc[args.entity].addSocket = async ({ socketId }) => {

      //add socket to entity
      const newUser = await lookUp.getLookUpBySocketId({
        socketId,
      })

      sameDoc[args.entity].sockets.push(newUser.data)

    }

    sameDoc[args.entity].removeSocket = async ({ socketId }) => {

      for (let i = 0; i < sameDoc[args.entity].sockets.length; i++) {
        const socket = sameDoc[args.entity].sockets[i];

        if (socket.socketId === socketId) {
          sameDoc[args.entity].sockets.splice(i, 1)

          break;
        }
      }

      // if no one is watching the entity, the entity delete itself for a fresh instance the next time the feature is opened.
      if (sameDoc[args.entity].sockets.length === 0) {
        delete sameDoc[args.entity]
      }
    }

    // install menu for database Json
    if (args.menu) {
      sameDoc[args.entity].menu = args.menu
    }

    return {
      success: true,
      data: sameDoc[args.entity],
    }
  }
}


