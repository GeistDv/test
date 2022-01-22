import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import moment from 'moment'
import UstToken from '../abis/UstToken.json';
import UsdtToken from '../abis/UsdtToken.json';
import UsdcToken from '../abis/UsdcToken.json';
import getPriceAndCostCalculation from './utils';
import dance from '../images/FIiy_CIVUAEmzBH.jpg';
import Select from 'react-select';
import React,{ useEffect, useState } from "react";
import Dancero from '../abis/Dancero.json';
import danceNFT from '../abis/danceNFT.json';


function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}  



function StepNine({ data, connect, transferToken, goBackPage }) {
  const [ exchangeRatio, setexchangeRatio] = useState()


  function getExchangeRate(){
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(res => {
      return res.json();
    })
    .then(res => {
      setexchangeRatio(res.rates.COP)
    })
  }
  
  useEffect(()=>{
      getExchangeRate();
  },[setexchangeRatio])



//---------------------------------------------------------------------


  const choice = [
    { value: 'estado 1', label: 'estado 1' },
    { value: 'estado 2', label: 'estado 2' },
    { value: 'estado 3', label: 'estado 3' }
  ]

    const MyComponent = () => (
      <Select options= {choice} />
  )


      
  var cost = getPriceAndCostCalculation(data.Service, data.Level, data.Hours,data.City,data.Venue,0); 
  var rest= cost[1]-cost[0];
  var total = rest;

  rest = rest / exchangeRatio;
  rest = Math.round(rest);
  //console.log(total, rest, cost);

  var initialDate = moment(data.dates.dateFrom).format("MMM Do YY");
  var finalDate = moment(data.dates.dateTo).format("MMM Do YY");
  const rows = [
    createData(<b>Date from</b>,initialDate, <b>City</b>, data.City),
    createData(<b>Date to</b>, finalDate, <b>Service Type</b>, data.Service),
    createData(<b>Venue</b>, data.Venue, <b>Level</b>, data.Level),
    createData(<b>Teacher Gender</b>, data.Gender, <b>Hours Pack</b>, data.Hours),
    createData(<b>Musical genre</b>, data.Musical_gender),

  ];


  const [imgNFT , setImgNFT] = useState(null)

  const [id , setId] = useState({
    id : ''

  })

  const handleImputChange = (event)=>{
    setId({
      [event.target.name] : event.target.value
    })
  }



  return (

    
    <Grid sx={{ flexGrow: 1 }} container spacing={2} p={2.5}>
      <Button variant='contained'
      onClick={async()=>{
        var address = data.user
        var danceroNft =  new window.web3.eth.Contract(Dancero.abi, "0xa7B7cC621163e3ac45c379c50580bff36D1310C5");
       /* function strainer (address) {
          return address === danceroNft.returnValues.operator 
        }*/
        danceroNft.getPastEvents('TransferSingle',{ fromBlock: 20388817}).then(function(events){
           //var filtered = events.filter(strainer);
           //const result = events.filter(event => event.address == "");
          console.log(events) // same results as the optional callback above
          //console.log(filtered)
      });
        //response= response.toString();
       // console.log(response);
      }}
      >events</Button>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>

          <Grid key={1} item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}

                    >
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{row.option}</TableCell>
                      <TableCell align="right">{row.name2}</TableCell>
                      <TableCell align="right">{row.option2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br></br>
            <Card
              sx={{ maxWidth: 500 }}
            >
              <CardMedia
                component="img"
                alt="Dance"
                height="140"
                image={imgNFT}
              />
              <br></br>
              <MyComponent></MyComponent>
              <CardActions>
                    
              <br></br>
              <Typography varian="body2">
                Id of your NFT:
              </Typography>
              <input type="text" name='id'
              onChange={handleImputChange}
              ></input>
              <Button variant="contained" size="small"
              onClick={async( event)=>{
                const danceroNft =  new window.web3.eth.Contract(Dancero.abi, "0xa7B7cC621163e3ac45c379c50580bff36D1310C5")
                const balance = await danceroNft.methods
                .balanceOf(data.user, id.id ).call()
                
                if(balance >= 1){
                  var jsonData = await danceroNft.methods.uri(id.id).call();
                  jsonData = jsonData.replace("{id}",id.id);
                  fetch(jsonData)
                  .then(response => response.json())
                  .then(data => {setImgNFT(data.image); console.log(data)});      
                  alert('se ha aplicado un descuento')
                  
                }else{
                  alert('usted no es propietario del token')
                }
              }}
              >
                  Search
              </Button>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              </CardActions>
            </Card>
          </Grid>
          <br></br>
          
              
           
         

          <Grid key={30} item>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
              <ListItem>
                <Grid key={19} item>
                  <Card  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Total to Pay  ({total} COP, ER = {exchangeRatio})
                      </Typography>
                      <CardActions>
                      </CardActions>
                      <Typography variant="h3" component="div">
                        {rest ? rest:"..."} USD
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid key={31} item>
                  <Card sx={{ maxWidth: 500 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Pay with crypto
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        style={{ margin: "10px" }}
                        onClick={async (e) => {
                          connect();
                        }}
                      >
                        Connect Metamask
                      </Button>
    
                      <input type="radio" id="payWithUsdc" name="val" value="payWithUsdc"></input> 
                      <label htmlFor="payWithUsdc"  >USDC</label>
                      
                   
                     
                      <input type="radio" id="payWithUsdt" name="val" value="payWithUsdt" defaultChecked ></input>
                      <label htmlFor="payWithUsdt">USDT</label>
                      
                     
                    
                      <input type="radio" id="payWithUst" name="val" value="payWithUst"></input>
                      <label htmlFor="payWithUsdc">UST</label>
                      
                      <Button
                        variant="contained"
                        style={{ margin: "10px" }}
                        disabled={!data.user}
                        id="btnPay"
                        onClick={async (event) => {
                          var amount = rest.toString();
                          var _contractAbi = '';
                          var _addressContract ="";

                          var ele = document.getElementsByName('val');
                          var radiusValue = '';
                          for( var i = 0; i < ele.length; i++) {
                          if(ele[i].checked)
                          radiusValue= ele[i].value
                          }
                          console.log(radiusValue)
                          if(radiusValue !== ''){
                            if(radiusValue === 'payWithUst') {
                              amount = "15";
                              _contractAbi = UstToken.abi;
                              _addressContract ="0x67862E5fD5DdCDAC1007786d8ce4469dDa847635";
                             
 
                           }else if(radiusValue==='payWithUsdt'){
                              _contractAbi = UsdtToken.abi;
                              _addressContract ="0x649C680dF9a192d9eE1F4Ed368962914dc3EF8c4";
                             
 
                           }else if(radiusValue === 'payWithUsdc'){
                              _contractAbi = UsdcToken.abi;
                              _addressContract ="0x413e1A7a3702756588857259e4a55Bd2E272cE4b";
                             
                           }
                           transferToken(amount, _contractAbi, _addressContract);

                          }
 
                        }}
                      >
                        Pay 
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid key={32} item>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Pay with FIAT
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" >pay with paypal</Button>
                      <Button variant="contained" >pay with stripe</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid key={33} item>
                  <Card sx={{ maxWidth: 80 }}>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => goBackPage()}
                      >
                        back
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepNine;  