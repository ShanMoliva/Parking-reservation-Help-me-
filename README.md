PLEASE HELP ME I CANT KEEP THE SLOTS IN THE PARKMANAGER.HTML 
IT DISAPPEARS AND I CANT SOLVE IT.

I NEED ALL USERS TO BE ABLE TO RESERVE SLOTS IN PARKMANAGER.HTML AND I DONT KNOW HOW.

SORRY FOR VERY LONG CODE I AM TRYING MY BEST.

PLEASE I NEED HELP! I AM DEPERATE I DONT KNOW WHO TO TURN TO.
I AM USING FIREBASE REALTIME DATABASE.

IF I CANT GET THIS TO WORK I WILL GET A FAILING GRADE.

MY DATABASE STRUCTURE:
reservations
  └── userId1
      └── reservationId1
          ├── address: "123 Main St"
          ├── imageurl: 
          ├── ownerId: userId1
          ├── ownerEmail:
          ├── slots
          │   └── slot1
          │       ├── fullname: user
          │       └── isOccupied: true/ fase
          │       └── Timestamp: 00:00
users
└── userId1
     ├── email: 
     ├── fullName: user
     ├── profilepic: 
     ├── role: user

     HOW PARKMANAGER.HTML WORKS:
     <button class="btn btn-success" id="saveButton2">Save</button> <!--SAVE RESERVATION TO THE DATABASE-->
     <button class="btn btn-info mt-3 button-fixed-width" id="addSlotButton">Add Slot</button> <!--CREATE SLOT TO THE DATABASE-->
     AGAIN SORRY FOR LONG CODE I AM TRYING MY BEST.
