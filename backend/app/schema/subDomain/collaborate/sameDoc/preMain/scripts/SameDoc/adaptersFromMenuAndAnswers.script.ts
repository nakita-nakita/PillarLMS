// this file is about converting database json into variables for sameDoc.set()

import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import _ from "lodash"
import RealTimeYDocAdapter from "../../../forUsage/adapters/RealTimeYDocAdapter";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import RealTimeColorAdapter from "../../../forUsage/adapters/RealTimeColorPickerAdapter";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";
import RealTimeFaviconSelectionAdapter from "../../../forUsage/adapters/RealTimeFaviconSelectionAdapter";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { RealTimeAdapterPropertyValue, RealTimeAllAdapters } from "./set.script";
import RealTimeColorSelectionAdapter from "../../../forUsage/adapters/RealTimeColorSelectionAdapter";
import RealTimeMediaSelectionAdapter from "../../../forUsage/adapters/RealTimeMediaSelectionAdapter";

type sameDocMenuItemType =
  | {
    header?: string;
    type?: string;
    isShowing?: { prop: string };
    data?: Array<{
      label: string;
      prop: string;
      type: string;
      defaultValue?: string;
      isShowing?: string;
    }>;
  };

export type sameDocMenuType = {
  menu?: sameDocMenuItemType[];
};

type input = {
  menu: sameDocMenuType,
  userAnswers: any,
}


export type EntityMenuItemType =
  | {
    header?: string;
    type?: string;
    isShowing?: {
      // adapterId?: string;
      name?: string;
    };
    data?: Array<{
      // adapterId?: string;
      name?: string;
    }>;
  };

export type EntityMenuType = {
  menu: EntityMenuItemType[];
};

type output = {
  adapters: RealTimeAdapterPropertyValue[],
  menu: EntityMenuType,
}

type selectAdapterInput = {
  type?: string,
  prop?: string,
  initialValue?: any,
  userAnswers?: any,
  label?: string,
  isShowing?: string,
}

export const selectAdapter = ({ type, prop, initialValue, userAnswers, label, isShowing }: selectAdapterInput) => {
  switch (type) {
    case "TEXTFIELD:V1":
      let initialText

      if (initialValue) {
        initialText = initialValue
      }

      if (userAnswers && userAnswers[prop]) {
        initialText = userAnswers[prop]
      }

      return new RealTimeYDocAdapter({
        initialText: initialText || "",
        name: prop,
        label,
      })
    case "SWITCH:V1":
      let initialBoolean;

      if (initialValue !== undefined) {
        initialBoolean = initialValue
      }

      if (userAnswers && userAnswers[prop] !== undefined && userAnswers[prop] !== null) {
        initialBoolean = userAnswers[prop]
      }

      return new RealTimeSwitchAdapter({
        initialBoolean: initialBoolean || false,
        name: prop,
        label,
      })

    case "COLOR_SELECTION:V1":
      let color
      let suggestedTextColor;

      if (initialValue !== undefined && initialValue !== null) {
        color = initialValue.color
        suggestedTextColor = initialValue.suggestedTextColor
      }

      if (userAnswers && userAnswers[prop]) {
        color = userAnswers[prop].color
        suggestedTextColor = userAnswers[prop].suggestedTextColor
      }

      return new RealTimeColorSelectionAdapter({
        name: prop,
        color: color || "#fff",
        suggestedTextColor, 
        label,
        isShowing,
      })

    case "MEDIA_SELECTION:V1":
      let media

      if (initialValue !== undefined) {
        media = initialValue
      }

      if (userAnswers && userAnswers[prop]) {
        media = userAnswers[prop].url
      }

      return new RealTimeMediaSelectionAdapter({
        name: prop,
        media,
        label,
      })
    default:
      return null
  }
}

export default function adaptersFromMenuAndAnswers(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<output>> => {
    if (typeof (args.userAnswers) === 'string') {
      args.userAnswers = JSON.parse(args.userAnswers)
    }

    const adapters: RealTimeAdapterPropertyValue[] = []
    let menu: EntityMenuType = {
      menu: []
    }

    for (let i = 0; i < args.menu.menu.length; i++) {
      const m = args.menu.menu[i];

      const newMenuItem: EntityMenuItemType = {
        header: m.header,
        type: m.type,
        data: []
      }

      //isShowing
      if (m?.isShowing?.prop) {
        const adapter = selectAdapter({
          prop: m.isShowing.prop,
          initialValue: true,
          type: "SWITCH:V1",
          userAnswers: args.userAnswers,
        })
        adapters.push({
          adapter,
          name: m.isShowing.prop,
        })

        newMenuItem.isShowing = {
          // adapterId: adapter.id,
          name: adapter.name,
        }
      }

      for (let x = 0; x < m.data.length; x++) {
        const data = m.data[x];


        const adapter = selectAdapter({
          type: data.type,
          initialValue: data.defaultValue,
          prop: data.prop,
          userAnswers: args.userAnswers,
          label: data.label,
          isShowing: data.isShowing,
        })

        if (adapter) {
          newMenuItem.data.push({
            // adapterId: adapter.id,
            name: adapter.name,
          })

          adapters.push({
            adapter,
            name: data.prop,
          })
        }

      }

      menu.menu.push(newMenuItem)
    }

    return {
      success: true,
      data: {
        adapters,
        menu,
      },
    }
  }
}


