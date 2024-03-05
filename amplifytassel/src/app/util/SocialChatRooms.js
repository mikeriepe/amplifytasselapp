import { DataStore } from '@aws-amplify/datastore';
import {  Profile, ChatRoom, ProfileChatRoom} from '../../models';

// creates a new chatroom for the 
export async function createNewChatRoom(userProfile, selected){
    const profiles = [userProfile];

    selected.forEach(async (email) => {
        const profile = await DataStore.query(Profile, (p) => p.email.eq(email));
        profiles.push(profile[0]);
    });

    const newChatRoom = await DataStore.save(
        new ChatRoom({
        ChatName: "A Chatter with " + userProfile.firstName + " " + userProfile.lastName + ", " + profiles.map((profile) => profile.firstName).join(", "),
        Profiles: [],
        Messages: [],
        })
    );

    profiles.forEach(async (profile) => {
        const _ = await DataStore.save(
        new ProfileChatRoom({
            "profile": profile,
            "chatRoom": newChatRoom
        })
        );
    });

    var oldChatroom = await DataStore.query(ChatRoom, (c) => c.id.eq(newChatRoom.id))
    oldChatroom = oldChatroom[0]

    // console.log("Old Chat Room Profiles:", await oldChatroom.Profiles.values)

return newChatRoom;
};

export async function findExistingChatRoom(allChatRooms, profileIDs) {
    for (const chat of allChatRooms) {
        const ProfilesAsyncCollection = chat.Profiles;
        const profiles = await ProfilesAsyncCollection.values;
        const profileIds = profiles.map(profile => profile.id);

        if (profileIds.sort().join(',') === profileIDs.sort().join(',')) {
            console.log("Found existing chat:", chat)
            return chat;
        }
    }
    return null;
};

export async function findExistingInfoChatRoom(userProfile, requested, allChatRooms){
    for (const chat of allChatRooms) {
        const ProfilesAsyncCollection = chat.Profiles;
        const profiles = await ProfilesAsyncCollection.values;

        console.log("Profile:", profiles[0], profiles[0].profileId);
        console.log("Requested:", requested);

        if (profiles.every((profile) => profile.status === "ADMIN" || requested.includes(profile.profileId))){
            if(!profiles.map((profile) => profile.id).includes(userProfile.id)){
                console.log("Found existing chat", chat)
                const _ = await DataStore.save(
                    new ProfileChatRoom({
                        "profile": userProfile,
                        "chatRoom": chat
                    })
                    );
            }

            return chat;
        }
    }
    return null;
};