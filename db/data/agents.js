
'use strict';

///////////////////////////////////////////////////////////////////////
///////////////////      configure agents          ////////////////////
//////////////////////////////////////////////////////////////////////

const uuidv1 = require('uuid/v1');

const objStore =  [
  {
  name: 'wat',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I am trying to figure out your response',
  priority: '1',
  handle: 'cb-dev-wat',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'news',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I will fetch you the news',
  priority: '1',
  handle: 'cb-dev-news',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'location',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I deliver locaton based services',
  priority: '1',
  handle: 'cb-dev-location',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'product',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I will tell you about this product',
  priority: '1',
  handle: 'cb-dev-product',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'sms',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'Let me text others on your behalf',
  priority: '1',
  handle: 'cb-dev-sms',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'blockchain',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'Immutable record',
  priority: '1',
  handle: 'cb-dev-blockchain',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'shipper',
	avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'Hi I will help you ship',
	priority: '1',
	handle: 'cb-dev-shipproduct',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'banter',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'banter',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/sm_banter.json'
  },
  {
    skillname:  'selltoys',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard%40hotmail.com_dev/default/sm_selltoys.json'
  },
  {
    skillname:  'liverep',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard%40hotmail.com_dev/default/sm_liverep.json'
  },
  {
    skillname:  'close',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard%40hotmail.com_dev/default/sm_close.json'
  }
],
  greeting: 'Lets talk',
  priority: '1',
  handle: 'cb-dev-banter',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'selltoys',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'agent',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/sm_selltoys.json'
  }],
  greeting: 'I sell things',
  priority: '1',
  handle: 'sm_selltoys',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'chain',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'agent',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/sm_chain.json'
  }],
  greeting: 'I post to the blockchain',
  priority: '1',
  handle: 'sm_chain',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'liverep',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'agent',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'I escalate to a live agent',
  priority: '1',
  handle: 'sm_liverep',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'close',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'agent',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'I can do a gentle close',
  priority: '1',
  handle: 'sm_close',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'social',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'agent',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/sm_social.json'
  }],
  greeting: 'I have more social graces and personality than banter',
  priority: '1',
  handle: 'sm_social',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'help',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'i am here to help',
  priority: '1',
  handle: 'cb-dev-help',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'music',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'Lets sing',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'marketing',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'Let me talk',
  priority: '1',
  handle: 'cb-dev-marketing',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'pricing',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I price',
  priority: '1',
  handle: 'cb-dev-pricing',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'sales',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I talk a lot',
  priority: '1',
  handle: 'cb-dev-sales',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'registrar',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I will sign you up',
  priority: '1',
  handle: 'cb-dev-registrar',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'general',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I generally get things done',
  priority: '1',
  handle: 'cb-dev-general',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'chaoticbot',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I bring order to chaos',
  priority: '1',
  handle: 'cb-dev-chaoticbot',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'test',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'},
    {
    skillname:  'startit',
    skilltype: 'system',
    skillsource: 'system'}],
  greeting: 'This is a testing agent -- call me whenever',
  priority: '1',
  handle: 'cb-dev-echo',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'content',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname: 'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'}
    ],
  greeting: 'What can I send you?',
  priority: '1',
  handle: 'cb-dev-content',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'notify',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'},
    {
    skillname:  'startit',
    skilltype: 'system',
    skillsource: 'system'},
    {
    skillname:  'saveit',
    skilltype: 'system',
    skillsource: 'system' },
    {
    skillname:  'getit',
    skilltype: 'system',
    skillsource: 'system' },
    {
    skillname:  'deleteit',
    skilltype: 'system',
    skillsource: 'system' },],
  greeting: 'How can I notify you?',
  priority: '1',
  handle: 'cb-dev-notify',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'morehelp',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I am here to help',
  priority: '1',
  handle: 'cb-dev-morehelp',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'support',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I am your support bot',
  priority: '1',
  handle: 'cb-dev-support',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'live',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'Let me connect you with a live agent',
  priority: '1',
  handle: 'cb-dev-live',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'returns',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I handle all returns',
  priority: '1',
  handle: 'cb-dev-return',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'proof',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'There is no better proof',
  priority: '1',
  handle: 'cb-dev-proof',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'mediator',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I mediate things -- like trying to connect you with another agent',
  priority: '1',
  handle: 'cb-dev-mediator',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'purchase',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I will complete the purchase for you',
  priority: '1',
  handle: 'cb-dev-purchase',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'payor',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I take payments - cash or credit. No bitcoin',
  priority: '1',
  handle: 'cb-dev-payor',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'dispute',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I have been known to resolve all disputes, or at least make a record',
  priority: '1',
  handle: 'cb-dev-dispute',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'Nancy',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'Hello - this is Nancy, your call center agent. How can I help?',
  priority: '1',
  handle: 'cb-dev-nancy',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'echo',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I just talk back',
  priority: '1',
  handle: 'cb-dev-echo',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'chaotic',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://openwhisk.ng.bluemix.net/api/v1/web/patrick.howard@hotmail.com_dev/default/cb-dev-echo.json'
  }],
  greeting: 'I am the original ChaoticBot',
  priority: '1',
  handle: 'cb-dev-chaotic',
  handler: "openwhisk",
  id: uuidv1() },
  {
  name: 'music2',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'Lets sing more',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'support',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'support for you',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'message',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'here is the sermon',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'prayer',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'I pray for you',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'times',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'Here is when we meet',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'events',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'This is what is happening',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'cg',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'Our community groups provide fellowship',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'weather',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'Here is a weather report',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'location',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'This is where we meet',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'mission',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'This is our mission',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'beliefs',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'This is what we believe',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'children',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'This is what we have for children',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'students',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'This is what we have for students',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'college',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'Our college ministry is great',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'giving',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'How to give',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'membership',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'Our membership program',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
  {
  name: 'serveweek',
  avatar: 'https://www.gravatar.com/avatar/',
  skills: [{
    skillname:  'echo',
    skilltype: 'api',
    skillsource: 'https://3e4j88h1w5.execute-api.us-east-1.amazonaws.com/staging/'
  }],
  greeting: 'How we server the community',
  priority: '1',
  handle: 'cb-dev-music',
  handler: "aws",
  id: uuidv1() },
]

module.exports = objStore;
