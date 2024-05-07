import { DataStore } from '@aws-amplify/datastore';
import {  Profile, ChatRoom, ProfileChatRoom} from '../../models';

// creates a new chatroom for the 
export async function createNewChatRoom(userProfile, selected){

    const profilePromises = selected.map(
        async (profileID) => {
            const profile = await DataStore.query(Profile, (profile) => profile.id.eq(profileID));
            return profile[0];
        }
    )

    const selectedProfiles = await Promise.all(profilePromises);
    const profiles = [userProfile].concat(selectedProfiles);

    const chatName = "A Chat between " + profiles.map((profile) => profile.firstName + " " + profile.lastName).join(", ")

    const newChatRoom = await DataStore.save(
        new ChatRoom({
        ChatName: chatName,
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
        ).catch(
            (reason) => {
                console.log("ProfileChatroom rejected because:", reason)
                alert("Failed to attach", profile.firstName, profile.lastName, "to this chatroom.")
            }
        );
    });

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

// TO-DO: Temporary implementation until we change the data model to accomodate the infoChatRoom instead.
export async function findExistingInfoChatRoom(userProfile, requested, allChatRooms){
    // Always use the latest available chatroom between them.
    allChatRooms = allChatRooms.sort((cr1, cr2) => cr1.createdAt > cr2.createdAt ? -1:1);
    for (const chat of allChatRooms) {
        const ProfilesAsyncCollection = chat.Profiles;
        const chatProfiles = await ProfilesAsyncCollection.values;

        if(chatProfiles.length === 0){
            continue;
        }

        const profilePromises = chatProfiles.map(
            async (chatProfile) => {
                const chatProfileId = chatProfile.profileId;
                const profile = await DataStore.query(Profile, (profile) => profile.id.eq(chatProfileId));
                return profile[0]
            }
        )

        const profiles = await Promise.all(profilePromises)
        const profileIds = profiles.map((profile) => profile.id)

        if (profiles.every((profile) => profile.status === "ADMIN" || requested.includes(profile.id)) && requested.every((requestedProfileId) => profileIds.includes(requestedProfileId))) {
            if(!profileIds.includes(userProfile.id)){
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