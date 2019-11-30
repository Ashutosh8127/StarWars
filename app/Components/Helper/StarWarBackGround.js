import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components';

const StarWarBackGround = props => (
    <StarWar
    source={props.imagename}
    >
    {props.content}
    </StarWar>
)

const StarWar = styled.ImageBackground`
    flex: 1;
    width: null;
    height: null;
    opacity: 0.9;
`

export default StarWarBackGround;