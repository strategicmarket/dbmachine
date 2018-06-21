
## db machine

Test data generator for the Strategic Machines set of platforms

## Getting Set Up

Getting the app running on your local machine takes only a few steps:

1. clone the project - `git clone https://github.com/strategicmarket/dbmachine.git
2. install dependencies - `npm install`

## Test Data Prep

In order to successfully navigate the test environment for Strategic Machines, it is important to understand the data model for the platform.

1. The platform owner provides the db location for the collection of client documents

A client document is the profile of a paying customer. A paying customer is the owner of a network that had been deployed through the platform.

The [platform configuration file](./config_example/platform.json) is an example of the configuration data that needs to be provided to the test data generator. This configuration file must match exactly the config file for web, messaging and analytic platforms. This file provide the uri for the location of the database which holds all client documents.

Note that in platform.json the uri, username and password must be supplied for MLAB deployed database. A uri is needed for a localhost deployed mongo database.

2. Each client document contains the uri of their database which holds collections pertinent to the operation of their network.

3. A client's database will hold documents related to members who have subscribed to their network, virtual agents (bots) that have been activated to operate on their network, configuration information and messages that have been sent.

In addition, a workitem collection is being generated one of the test client's (name='Machine'). The 'Machine' is a client of the platform who also has the privilege of operating a marketplace. The marketplace is venue in which customers can request custom services to build bots.

4. For every client document where isActivated==true, a corresponding uri must be provided to store the test data for that client. If the uri points to MLAB, the database must be defined and valid username and password data must be supplied

## Test Data Generation - right from your laptop

1. node server

2. Follow the prompts

In order to simplify this process of generating test data, the following assumptions are made
> if localhost is selected as the destination of the test data sets, no additional work is needed other than running mongo on your local host
> if MLAB is selected as the destination of the test data sets, the following steps are required to successfully complete the process before running the test data generator
- create 4 databases on MLAB account(s), with each test database having a database user of machina and a password of Awes0me
- the four databases should be named platform, chaotic, machine, and mercy
- the platform database is owned by the platform, and stores the collection of client documents
- the chaotic, machine and mercy databases correspond to 3 test customers of the platform, and each these respective database will hold agent, member, config and interaction data (as well as workitems used by the 'machine')
- the MLAB test generator questions will ask specifically for the subdomain and port ... and assumes the userid, password and db name conforms to the requirements listed above

mongodb://machina:Awes0me@ds025802.mlab.com:25802/platform

sample URI ... in this sample ... subdomain = ds022802 and port = 22802
[graphic](./assets.mlab.png)
Note - each of these test customers have the same exact collections after test data generation. The test data can be modified using the data editor on MLAB if other test conditions need to be tested

## License and Use
 [LICENSE](./LICENSE.txt)

## Contributing
 [contributing](.github/CONTRIBUTING.md)

xio labs and affiliates

connecting businesses with the conversational economy
