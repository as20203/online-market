import React from 'react';
import {Segment,Container,Grid,Header,List,Item} from 'semantic-ui-react';
import './Footer.css'
const footer = ()=>{

    return(
        <Segment inverted={true} vertical={true} className="footerStyle"> 
            <Container>

                <Grid stackable={true} inverted={true} divided={true} > 
               
                    <Grid.Column width={3}>
                            <Header as='h4' textAlign={"left"} inverted={true}>About</Header>
                            <List inverted={true} link={true}>
                               <Item><p>Sitemap</p></Item> 
                               <Item> <p>Contact Us</p></Item> 
                               <Item> <p>Sales</p></Item>
                               <Item> <p>Offers</p></Item>
                            </List>
                   </Grid.Column>

                    <Grid.Column width={3}>
                    <Header as='h4' textAlign={"left"} inverted={true}>Services</Header>
                        <List inverted={true} link={true}>  
                        <Item><p>Product PreOrder</p></Item> 
                               <Item> <p>FAQ's</p></Item> 
                               <Item> <p>How To Access</p></Item>
                               <Item> <p>Best Buying Plans</p></Item>
                        </List>
                    </Grid.Column>
                    
                    <Grid.Column width={7}>
                    <Header as='h4' textAlign={"left"} inverted={true}>Copyrights</Header>
                        <p>JNS ONLINE MARKET</p>
                        <p>All Rights Reserved 2018-2022</p>
                        
                    </Grid.Column>
               </Grid>
            </Container>
    </Segment>

    )

}

export default footer;