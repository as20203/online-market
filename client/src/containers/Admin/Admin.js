import React,{Component} from 'react';
import {Segment,Container,Header,Form,Dropdown,Button,Divider,Grid} from 'semantic-ui-react';


class Admin extends Component{
    state={
        reportedUser:'',
    }
    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
         console.log(this.state.reportedUser);
       
      }

      handleChange = (e, { value }) => {
        this.setState({reportedUser:value});
    }




    render(){
        window.scrollTo(0,0);
        const users = [
            {key:'id1',value:'jawad',text:'jawad'},
            {key:'id2',value:'as20203',text:'as20203'},
            {key:'id3',value:'ali',text:'ali'},
            {key:'id4',value:'ahmed',text:'ahmed'},
            {key:'id5',value:'noshi',text:'noshi'}
          ]

          const products = [
            {key:'id1',value:'computer',text:'computer'},
            {key:'id2',value:'table',text:'table'},
            {key:'id3',value:'laptop',text:'laptop'},
            {key:'id4',value:'desk',text:'desk'},
            {key:'id5',value:'chair',text:'chair'}
          ]
        return(
            <Grid className="SignUpGrid">
                <Segment style={{margin:'200px auto',width:'80%'}}>
                    <Header color={'teal'} as='h1'>Admin Panel</Header>
                    <Divider />
                    <Header color={'red'} textAlign='left' as='h4'>Report User</Header>
                    <Container > 
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                       
                                    
                                    <label> Select User: </label>
                                    <Dropdown defaultValue={'Other'} required={true} placeholder='Select User' onChange={this.handleChange} selection options={users} />
                               

                               
                                     </Form.Field>
                
                                      

                                     <Form.Field>
                                        <Button color={'red'} type='submit' className='Button'> Report User</Button>
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>

                         <Divider />
                         <Header color={'red'} textAlign='left' as='h4'>Remove Product</Header>
                         <Container > 
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                    <label> Select Product: </label>
                                    <Dropdown defaultValue={'Other'} required={true} placeholder='Select Product' onChange={this.handleChange} selection options={products} />             
                                     </Form.Field>
                
                                     <Form.Field>
                                        <Button color={'red'} type='submit' className='Button'> Remove Product</Button>
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>

                </Segment>
               
           
                </Grid>
        );
    }
}

export default Admin;