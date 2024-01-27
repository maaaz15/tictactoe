import React from 'react'
import type {PropsWithChildren} from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'
import IconC from 'react-native-vector-icons/AntDesign'

type IconProps = PropsWithChildren<{
    name: string;
}>
const Icons = ({name}: IconProps) => {
    switch (name) {
        case 'circle':
            return <Icon name='circle-thin' size={38} color='#000000' />
        case 'cross':
            return <IconC name='close' size={38} color='#000000' />
        default:
            break;
    }
}

export default Icons
