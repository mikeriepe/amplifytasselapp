import { DataStore } from "aws-amplify";
import ViewOpportunityPeopleCard from "../components/ViewOpportunityPeopleCard";
import { useState, useEffect } from 'react';
import {Profile} from './../../models';
import {createUserProfile, createOppProfile} from '../util/ExtractInformation'
import Grid from '@mui/material/Grid'; // Grid version 1

// Call lambda function to get matching recommendations
const fetchPeopleIds = async (mergedJSON) => {
    try {
        const url = "https://sqom3pvbo0.execute-api.us-west-1.amazonaws.com/default/reverse-recommendation-engine"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            },
            body: JSON.stringify(mergedJSON),
        });

        const data = await response.json();
        
        return data["order"];
    } catch (error) {
        throw new Error("Recommendation Engine failed to respond correctly: " + error);
    }
}

const mapIdToPos = (volunteers) => {
    const idToPos = {}
    for (let pos = 0; pos < volunteers.length; pos++){
        const id = volunteers[pos].id;
        idToPos[id] = pos;
    }
    return idToPos;
}

export default function ViewOpportunityFindPeople({ 
    opp,
    handleCardClick
}){
    const [people, setPeople] = useState([]);

    const getPossibleVolunteers = async (poster) => {
        const possibleVolunteers = await DataStore.query(Profile, p => p.id.ne(poster)) // Promise.all((await DataStore.query(Profile, p => p.id.ne(poster))).map(createUserProfile));
        return possibleVolunteers;
    }

    const fetchPeople = async () => {
        const possibleVolunteers = await getPossibleVolunteers(opp.profileID);
        const volunteerFields = {}
        volunteerFields["users"] = await Promise.all(possibleVolunteers.map(createUserProfile));
        const idToPos = mapIdToPos(possibleVolunteers);

        setPeople(possibleVolunteers);

        const oppFields = {};
        oppFields["events"] = [await createOppProfile(opp)];

        const recommendedIds = await fetchPeopleIds(Object.assign({}, volunteerFields, oppFields));

        const filteredProfiles = recommendedIds.map(id => {
            return possibleVolunteers[idToPos[id]];
        })

        setPeople(filteredProfiles);
    }

    useEffect(() => {
        fetchPeople();
    }, [])

    return <>
        <Grid container columnSpacing={{xs: 1}}>
        {people.map(
            (profile) => {
                return (
                    <Grid xs={6}>
                        <ViewOpportunityPeopleCard
                            key = {profile.id}
                            profile = {profile}
                            handleCardClick = {handleCardClick}/>
                    </Grid>
                        )
                }
            )
        }
        </Grid>
    </>  
}

