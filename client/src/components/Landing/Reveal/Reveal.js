import React from 'react'
import { Image, Reveal } from 'semantic-ui-react'
const RevealExampleFade = (props) => (
  <Reveal animated={props.animated} >
    <Reveal.Content visible style={{right:'0px'}} >
    
    <Image size={props.size}  centered={true} rounded={true} src={props.visible}  />

    </Reveal.Content>
    <Reveal.Content hidden>
    <Image size={props.size}  centered={true}  rounded={true} src={props.hidden}  />

    </Reveal.Content>
  </Reveal>
)

export default RevealExampleFade;