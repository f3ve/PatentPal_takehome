export default {
  target: null,
  setTarget(val) {
    this.target = val;
  },
  clearTarget() {
    this.target = null;
  },
  nodes: [
    {
      id: '73c747a8-201b-48a5-8fba-0ac97b928560',
      text: '',
      type: 'CONCEPT',
      concepts: ['39739355-091c-457c-a9e6-dcb4e3692283'],
      parent: '8c476652-1369-4e3a-ac3b-f5fd4eade2eb',
      children: [],
    },
  ],

  setNodes(val) {
    this.nodes = val;
  },

  clearNodes() {
    this.nodes = [
      {
        id: '73c747a8-201b-48a5-8fba-0ac97b928560',
        text: '',
        type: 'CONTEXT',
        parent: 'null',
        children: [],
      },
    ];
  },
};

export const fillerNodes = [
  {
    id: '8c476652-1369-4e3a-ac3b-f5fd4eade2eb',
    text: 'a computer system',
    type: 'CONCEPT',
    parent: null,
    children: [
      {
        id: '73c747a8-201b-48a5-8fba-0aasdac97b818560',
        text: 'a child node',
        type: 'CONCEPT',
        concepts: ['39739355-091c-457c-a9e6-dcb4e369122283'],
        parent: '8c476652-1369-4e3a-ac3b-f5fd4eade2eb',
        children: [
          {
            id: '73c747a8-201b-asdfasaa48a5-8fba-0ac9718238560',
            text: 'a child node',
            type: 'CONTEXT',
            concepts: ['39739355-091c-457c-a9e6-dcb4e369122283'],
            parent: '73c747a8-201b-48a5-8fba-0aasdac97b818560',
            children: [],
          },
        ],
      },
      {
        id: '73c747a8-201b-asda48a5-8fba-0ac9718238560',
        text: 'another child node',
        type: 'CONTEXT',
        concepts: ['39739355-091c-457c-a9e6-dcb4e369122283'],
        parent: '73c747a8-201b-48a5-8fba-0aasdac97b818560',
        children: [],
      },
    ],
  },
  {
    id: '73c747a8-201b-48a5-8fba-0ac97b928560',
    text: 'an enclosure',
    type: 'CONTEXT',
    parent: null,
    children: [],
  },
  {
    id: '46cd4fad-51a7-42ea-a39f-573ca326c19a',
    text: 'a power controller',
    type: 'CONTEXT',
    parent: null,
    children: [],
  },
];
