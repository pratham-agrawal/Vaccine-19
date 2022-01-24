import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from '../HeatmapLayer';
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import './heatmap.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'firstName', headerName: 'First name', width: 110 },
  { field: 'lastName', headerName: 'Last name', width: 110 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 100,
  },

];

let rows = [];
    function Heatmap() {
        const [addressPoints, setAddressPoints] = useState(0);
        const [candidates, setCandidates] = useState(0);

        useEffect (async () => {
            console.log("start");
            let token = localStorage.getItem('authToken'); 
            const users = await axios.get('http://localhost:3600/users/get/40', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(users);
            setCandidates(users.data);
            rows = users.data;

            const result = axios(
              'http://localhost:3600/heatmap'
            ).then(response =>{
                let points = [];
                response.data.forEach(element => {
                    points.push([element.latitude, element.longitude, element.priority]);
                });
                setAddressPoints(points);
            }).catch(error =>{
                console.log(error);
            });
       
        }, []);

        return (
            <div>
                <Map center={[0, 0]} zoom={13} style={{ height: "70vh"}}>
                    <HeatmapLayer
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        points={addressPoints}
                        longitudeExtractor={m => m[1]}
                        latitudeExtractor={m => m[0]}
                        intensityExtractor={m => parseFloat(m[2])} />
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>


                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>
                <div className="email-button">
                    <Button variant="contained" color="secondary" onClick={() => {alert("Emails sent to vaccine candidates.")}}>
                        Send Emails
                    </Button>
                </div>
            </div>
        );
    }
 
export default Heatmap; 

// render(<MapExample />, document.getElementById('app'));