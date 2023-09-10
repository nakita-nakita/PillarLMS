import React from 'react'
// import TotalAvatars from '../../items/AvatarGroup/TotalAvatars.item'
import PropTypes from 'prop-types'
import AdminLayoutContext from '../../adminLayout.context'
import TotalAvatars from './TotalAvatars.item'
import EveryoneOnPageModal from './EveryoneOnPage.modal'
// import EveryoneOnPageModal from './EveryoneOnPage.modal'

function WithAvatarGroup({ total, listOfIcons, max }) {
  const { whoIsOnPage, setWhoIsOnPage } = React.useContext(AdminLayoutContext)
  const [avatarTotal, setAvatarTotal] = React.useState(0)

  React.useEffect(() => {
    setAvatarTotal(avatarTotal)
  }, [total])

  const onOpen = (event) => {
    console.log('onOpen has been clicked!')
    setWhoIsOnPage(prevState => ({
      ...prevState,
      modal_isEveryoneOnPageModalOpened: true
    }))
  }

  const onClose = (event) => {
    setWhoIsOnPage(prevState => ({
      ...prevState,
      modal_isEveryoneOnPageModalOpened: false
    }))
  }


  return (
    <div>
      <TotalAvatars max={max} total={avatarTotal} listOfIcons={listOfIcons} onClick={onOpen} />
      <EveryoneOnPageModal
        isOpened={whoIsOnPage.modal_isEveryoneOnPageModalOpened}
        onClose={onClose}
        listOfIcons={listOfIcons}
        total={total}
      />
    </div>
  )
}

WithAvatarGroup.propTypes = {
  total: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  listOfIcons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    status: PropTypes.string,
  })).isRequired,
}

export default WithAvatarGroup
