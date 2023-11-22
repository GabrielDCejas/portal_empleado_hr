// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from '../acl/Can'

const CanViewNavGroup = props => {
  // ** Props
  const { children, navGroup } = props

  // ** Hook
  const ability = useContext(AbilityContext)

  const canViewMenuGroup = item => {
    const hasAnyVisibleChild = item.children && item.children.some(i => ability && ability.can(i.action, i.subject))
    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    return ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
  }
  if (navGroup && navGroup.auth === false) {
    return <>{children}</>
  } else {
    return navGroup ? <>{children}</> : null
  }
}

export default CanViewNavGroup
