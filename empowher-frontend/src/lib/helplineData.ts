interface HelplineNumber {
  name: string;
  number: string;
  description?: string;
}

interface StateHelplines {
  [key: string]: HelplineNumber[];
}

export const nationalHelplines: HelplineNumber[] = [
  {
    name: "Women's National Helpline",
    number: "1091",
    description: "24/7 emergency assistance for women in distress",
  },
  {
    name: "Domestic Violence Helpline",
    number: "181",
    description: "National helpline for domestic violence cases",
  },
  {
    name: "National Commission for Women",
    number: "011-26942369",
    description: "Central authority for women's rights and protection",
  },
  {
    name: "Police Emergency",
    number: "100",
    description: "Emergency police assistance",
  },
  {
    name: "Emergency Ambulance",
    number: "102",
    description: "Medical emergency services",
  },
];

export const stateHelplines: StateHelplines = {
  delhi: [
    {
      name: "Delhi Commission for Women",
      number: "011-23379181",
      description: "State women's commission helpline",
    },
    {
      name: "Delhi Women Protection Cell",
      number: "011-24673366",
      description: "Special cell for women protection",
    },
  ],
  maharashtra: [
    {
      name: "Maharashtra Women's Commission",
      number: "022-26592707",
      description: "State commission for women",
    },
    {
      name: "Mumbai Women's Helpline",
      number: "022-22633333",
      description: "Mumbai city women's helpline",
    },
  ],
  "tamil-nadu": [
    {
      name: "Tamil Nadu Women's Commission",
      number: "044-28592750",
      description: "State commission for women",
    },
    {
      name: "Chennai Women's Helpline",
      number: "044-28592813",
      description: "Chennai city women's helpline",
    },
  ],
  karnataka: [
    {
      name: "Karnataka Women's Commission",
      number: "080-22100435",
      description: "State commission for women",
    },
    {
      name: "Bengaluru Women's Helpline",
      number: "080-22943225",
      description: "Bengaluru city women's helpline",
    },
  ],
  "uttar-pradesh": [
    {
      name: "UP Women's Commission",
      number: "1090",
      description: "State women's helpline",
    },
    {
      name: "UP Women Power Line",
      number: "181",
      description: "Women power line for emergency assistance",
    },
  ],
  // Add more states with their specific helpline numbers
  // Default helplines for states without specific numbers
  default: [
    {
      name: "State Women's Commission",
      number: "181",
      description: "State-level women's helpline",
    },
  ],
};
