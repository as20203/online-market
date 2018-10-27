import React from 'react'
import { Image, Reveal } from 'semantic-ui-react'
import './Reveal.css';
const RevealExampleFade = (props) => (
  <Reveal animated={props.animated}>
    <Reveal.Content visible>
    <Image size={props.size} className="imageStyle" centered={true}  rounded={true} src={props.visible}  />

    </Reveal.Content>
    <Reveal.Content hidden>
    <Image size={props.size} className="imageStyle" centered={true}  rounded={true} src={props.hidden}  />

    </Reveal.Content>
  </Reveal>
)

export default RevealExampleFade