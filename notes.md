# Design Notes

## Security 

We're using firebase auth, storage and firstore. Security on the server side will generally be configured to limit users to see their own namespaced data. For file storage this will mean refs beginning with 

    /users/{userId}/** (where userId = request.auth.uid)

For firestore users will either have access to their own user document:

    /users/{userId} (where userId = request.auth.uid)

Or to other documents where they are the owner

    /collection/xxxx (where request.resource.data.owner == request.auth.uid)

## Meal Uploads

User images will be uploaded under the user scope with an additional context scope (image type or use such as meal or before/after) and a timestamp. We could use something like a uuid or a hash of the image, but timestamps are unlikely to collide since there already scoped under the user (so a user is unlikely to take two pictures at the same time) and the timestamp itself provides useful metadata for something like a meal image. For instance:

    /users/{userId}/meals/before/{timeInMillis}.jpg

Metadata (meal notes, references to images) will be stored in firestore. For now we'll stick it under the user document, but we should probably break it up into some kind of reasonable time chunk -- like a month of data at a time -- or an arbitrary page size -- such as 100 meals. Each of these pages would be a list of meals and the user document would contain a list of pages.

Meal objects themselves would include references to uploaded images, but possibly also a dataUrl containing a base64 encoded thumbnail image.