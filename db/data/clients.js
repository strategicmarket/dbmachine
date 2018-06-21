
///////////////////////////////////////////////////////////////////////
/////////////////// configure client object       ////////////////////
//////////////////////////////////////////////////////////////////////
const uuidv1 = require('uuid/v1');

const objStore = [
  {
	name: "Acme Industries",
	image: 'https://randomuser.me/api/portraits/men/7.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
	contact: 'Bill Smith',
	phone: '704-555-1212',
  isActivated: false
  },
  {
	name: "chaotic",
  image: 'https://randomuser.me/api/portraits/men/14.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
	contact: 'ChaoticRoute',
	phone: '704-555-1212',
	sms: "+17042289191",
	web: "demo",
	dbname: "chaotic",
	uri: "mongodb://localhost:27017/",
	username: "machina",
	password: "Charl0tte",
  isActivated: true
	},
	{
	name: "machine",
  image: 'https://randomuser.me/api/portraits/men/14.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
	contact: 'Machine',
	phone: '704-555-1212',
	sms: "+19148195104",
	web: "demo",
	dbname: "machine",
  uri: "mongodb://localhost:27017/",
	username: "machina",
	password: "Charl0tte",
  isActivated: true
},
  {
	name: "Beta Industries",
	image: 'https://randomuser.me/api/portraits/men/14.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
	contact: 'Bill Jones',
	phone: '704-555-1212',
  isPrivate: false,
  isActivated: false
  },
  {
	name: "Alpha Industries",
	image: 'https://randomuser.me/api/portraits/men/91.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
	contact: 'Bill Alpha',
	phone: '704-555-1212',
  isPrivate: false,
  isActivated: false
  },
  {
	name: "mercy",
  image: 'https://randomuser.me/api/portraits/men/91.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
	sms: "+19802294921",
	web: "mercy",
	dbname: "mercy",
  uri: "mongodb://localhost:27017/",
	username: "machina",
	password: "Charl0tte",
	contact: 'Charlie King',
	phone: '704-555-1212',
  isPrivate: false,
  isActivated: true
	},
  {
  name: "Pivot and Scale",
  image: 'https://randomuser.me/api/portraits/men/62.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Annapolis',
  state:'MD',
  zip: '12345',
  contact: 'Dave',
  phone: '+17042282288',
  isActivated: false
  },
  {
  name: "Medical Center",
  image: 'https://randomuser.me/api/portraits/women/94.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Annapolis',
  state:'MD',
  zip: '12345',
  contact: 'Nurse',
  phone: '+17045551212',
  isActivated: false
  },
  {
  name: "Software company",
  image: 'https://randomuser.me/api/portraits/men/73.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  contact: 'Mike',
  phone: '+17045551111',
  isActivated: false
  },
  {
  name: "Utility",
  image: 'https://randomuser.me/api/portraits/women/27.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  contact: 'Uko',
  phone: '+19192223333',
  isActivated: false
  },
  {
  name: "IBM",
  image: 'https://randomuser.me/api/portraits/women/36.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Armonk',
  state:'NY',
  zip: '12345',
  contact: 'Janna',
  phone: '+12124454444',
  isActivated: false
  },
  {
  name: "xio partners",
  image: 'https://randomuser.me/api/portraits/men/83.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  contact: 'Pat',
  phone: '+17044445555',
  isActivated: false
  }

]

module.exports = objStore;
