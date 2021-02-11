export default {
  nodes: [
    {
      id: '8c476652-1369-4e3a-ac3b-f5fd4eade2eb',
      text: 'a computer system',
      type: 'CONCEPT',
      concepts: ['bc88a2de-3686-4c9f-93f1-86970dcf86f8'],
      parent: null,
      // children: [
      //   '73c747a8-201b-48a5-8fba-0ac97b928560',
      //   '46cd4fad-51a7-42ea-a39f-573ca326c19a',
      // ],
    },
    {
      id: '73c747a8-201b-48a5-8fba-0ac97b928560',
      text: 'an enclosure',
      type: 'CONCEPT',
      concepts: ['39739355-091c-457c-a9e6-dcb4e3692283'],
      parent: '8c476652-1369-4e3a-ac3b-f5fd4eade2eb',
      // children: ['9228f31f-8969-45e5-81a7-5e40740ffd06'],
    },
    {
      id: '46cd4fad-51a7-42ea-a39f-573ca326c19a',
      text: 'a power controller',
      type: 'CONTEXT',
      concepts: ['43673e5a-fbcc-44ba-8e96-69aef0bda8a9'],
      parent: '8c476652-1369-4e3a-ac3b-f5fd4eade2eb',
      // children: null,
    },
  ],
};
