## Registry 2.0 go live plan

## Push app to test namespace to enable usability testing

https://platsrv-registry-web-101ed4-test.apps.silver.devops.gov.bc.ca

Note that only CLAB requests will work

## Test that a project can be:
-   Created -> Approved/ Rejected -> Is provisioned
-   Edited -> Approved/ Rejected -> Is provisioned 
-   Deleted -> Approved/ Rejected -> Is provisioned

Alex L, Ian and Zhanna please feel free to update this document with your findings. Also feel free to create tickets.

### Alex l
Make sure that the above flows are correctly represented in the app 
Make sure that the quota options are the same as in the current registry
Make sure the ministries are correct
Make sure the common component options are correct

**Note:** 
- The common components input has a bug. Please just select `No Services` I will fix it when I am back.
- The CSV download has a bug, I will fix it when I am back

## Ian
Please verify that projects are actaully being provisioned when requests are approved (**Create**, **Edit**, **Delete**). 
You can possibly coordinate this with Alex L when she tests out the web app. Thanks!

Also, as discussed in the go-live meeting, could you please verify that the provisioner will handle multiple quota changes in a singe provision. As in the new registry, a user is able to change the memory, storage and cpu for prod, test, dev and tools in a single project request.

## Zhana

The emails are not working like they used to. This is because I changed things arround that broke the emails. Sorry for that and for the extra work, but can you please test out the emails locally and fix those changes. Thank you Zhanna, your work on this feature is appreciated and the emails look great.

## Alex C

I have updated the ticket for the Graph API with more details. Thansk for working on this. 

## Promote to Prod when the above testing is complete

Carry out Create, Edit, Delete testing for other clusters other than CLAB. Verify that they work 

## Database Migration

### Replica set

The new registry requires a mongodb database that has a replica set. A replica set is required as the registry API performs database transactions. Therefore, the
API will not work without a mongodb replica set. There was an issue creating this and so we are currently using a mongodb atlas cloud instance and not our own databse.
This way we can still perform testing.

I do not have the ability to fix the mongodb replica set in the database that we currently have. Billy created the database but may not have availabilty to fix it this week.
Ian, if this is something that you can take on that would be very helpful. Maybe talk to Billy about the issues that he is facing with the replica set. Thank you

### Backups

Billy has confirmed that the mongodb database automatically backs up 


### Migrate old data to new database

There is a script in the API that takes an SQL dump file and uses it to populate the new database with all the existing projects in the old database.

When we are ready to depricate the current registry we will need to:

1) Take down the web route to teh old registry so that users do not request projects while we are migrating to the new registry.
2) Download a sql dump of the old registry and use the migrate script to populate the new database
3) Set the registry domain to the new web app

Note: We will need to send out emails to the users warning them of the change
