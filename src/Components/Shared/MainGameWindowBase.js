import { Component, useEffect, useState}  from 'react';
import { Center, Container, Text } from '@chakra-ui/react';

const style = {
    minWidth: "1000px",
    padding: "0px",
    display: "inline-block",
    position: "absolute",
    top: "10%",
    left: "23%"
}

export default function MainGameWindowBase()
{
    return(
        <Container style={style}>
            <img src='./images/crimsonos/CrimsonOS_Window_BASE.png' alt=""/>
        </Container>
    )
}