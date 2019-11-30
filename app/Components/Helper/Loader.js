import React from 'react';
import {
    ActivityIndicator
} from 'react-native';
import styled from 'styled-components';


const Loader = props => (
    props.isLoading ?
    <ActivityIndicator
    size="large"
    color={props.color}
    />
    : null
) 

const ActivityLoader = styled.ActivityIndicator`
    

`
export default Loader;