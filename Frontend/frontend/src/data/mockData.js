import { tokens } from "../theme";

/*Dummy Data for Users and Map Countries*/
export const mockDataDonationInfo = [
  {
    id: 1,
    date: "22-Feb-2023",
    madeby: "Aown Raza",
    givenby: "Admin 1",
    amountused: "$60",
    givento: "Beneficiary 1",
    category: "Food",
  },
  {
    id: 2,
    date: "22-Feb-2023",
    madeby: "Aown Raza",
    givenby: "Admin 2",
    amountused: "$40",
    givento: "Beneficiary 2",
    category: "Education",
  },
];

export const mockDataDonationInfo2 = [
  {
    id: 1,
    date: "22-Feb-2023",
    madeby: "Aown Raza",
    givenby: "Admin 1",
    amountused: "$60",
    givento: "Beneficiary 1",
    category: "Food",
  },
];

export const mockDataDonationInfo3 = [
  {
    id: 1,
    date: "22-Feb-2023",
    recievedfrom: "Aown Raza",
    madeby: "Admin 1",
    amountused: "$60",
  },
  {
    id: 2,
    date: "24-Feb-2023",
    recievedfrom: "Qasim",
    madeby: "Admin 2",
    amountused: "$600",
  },
  {
    id: 3,
    date: "26-Feb-2023",
    recievedfrom: "ABC",
    madeby: "Admin 3",
    amountused: "$600",
  },
];

export const mockDonationRequests = [
  {
    id: 1,
    date: "22-Feb-2023",
    donor: "Aown Raza",
    amount: "$100",
    category: "Food",
    allocated: "Admin 1"
  },
  {
    id: 2,
    date: "24-Feb-2023",
    donor: "M. Qasim",
    amount: "$200",
    category: "Education",
    allocated: "Admin 2"
  }, {
    id: 3,
    date: "25-Feb-2023",
    donor: "Aown Raza",
    amount: "$90",
    category: "Housing",
    allocated: "Admin 1"
  },
];


export const mockDataUsers = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    accounttype: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    accounttype: "beneficiary",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    accounttype: "donor",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    accounttype: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    accounttype: "donor",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    accounttype: "beneficiary",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    accounttype: "donor",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    accounttype: "donor",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    accounttype: "admin",
  },
];


export const mockDataBeneficiary = [
  {
    id: 1,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    accounttype: "Beneficiary",
  },
  {
    id: 2,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    accounttype: "Beneficiary",
  },
  {
    id: 3,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    accounttype: "Beneficiary",
  },
  {
    id: 4,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    accounttype: "Beneficiary",
  },
  {
    id: 5,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    accounttype: "Beneficiary",
  },
  {
    id: 6,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    accounttype: "Beneficiary",
  },
  {
    id: 7,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    accounttype: "Beneficiary",
  },
  {
    id: 8,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    accounttype: "Beneficiary",
  },
  {
    id: 9,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    accounttype: "Beneficiary",
  },

];

export const mockDataDonor = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    accounttype: "Donor",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    accounttype: "Donor",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    accounttype: "Donor",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    accounttype: "Donor",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    accounttype: "Donor",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    accounttype: "Donor",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    accounttype: "Donor",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    accounttype: "Donor",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    accounttype: "Donor",
  },
];

export const mockDataDonations = [
  // {
  //   // This is probably the format of documents that we shall recieve from the backend.
  //   id: 1,
  //   donor: {
  //     name: "Jon Snow",
  //     email: "jonsnow@gmail.com",
  //     age: 35,
  //     phone: "(665)121-5454",
  //     address: "0912 Won Street, Alabama, SY 10001",
  //   },
  //   beneficiary: {
  //     name: "Jon Doe",
  //     email: "johnDoe@gmail.com",
  //     age: 28,
  //     phone: "(665)191-3554",
  //     address: "0912 Won Street, Alabama, SY 10001",
  //   },
  //   city: "New York",
  //   date: "22/5/2022",
  //   donationamount: "$123512",
  // },
  {
    id: 1,
    name: "Aown Raza",
    email: "AownRaza@gmail.com",
    age: 21,
    phone: "(+92)333-333333",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    date: "22/5/2022",
    donationamount: "$123512",
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    date: "22/5/2022",
    donationamount: "$123512",
  },
];

export const mockDataRecent = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    donation: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    donation: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    donation: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    donation: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    donation: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    donation: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    donation: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    donation: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021",
  },
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
    City: "ISL",
    "Education": 137,
    EducationColor: "hsl(229, 70%, 50%)",
    Meals: 96,
    MealsColor: "hsl(296, 70%, 50%)",
    NaturalDisaster: 72,
    NaturalDisasterColor: "hsl(97, 70%, 50%)",
    Medical: 140,
    MedicalColor: "hsl(340, 70%, 50%)",
  },
  {
    City: "RWP",
    "Education": 55,
    "EducationColor": "hsl(307, 70%, 50%)",
    Meals: 28,
    MealsColor: "hsl(111, 70%, 50%)",
    NaturalDisaster: 58,
    NaturalDisasterColor: "hsl(273, 70%, 50%)",
    Medical: 29,
    MedicalColor: "hsl(275, 70%, 50%)",
  },
  {
    City: "FSD",
    "Education": 109,
    "EducationColor": "hsl(72, 70%, 50%)",
    Meals: 23,
    MealsColor: "hsl(96, 70%, 50%)",
    NaturalDisaster: 34,
    NaturalDisasterColor: "hsl(106, 70%, 50%)",
    Medical: 152,
    MedicalColor: "hsl(256, 70%, 50%)",
  },
  {
    City: "GUJ",
    "Education": 133,
    "EducationColor": "hsl(257, 70%, 50%)",
    Meals: 52,
    MealsColor: "hsl(326, 70%, 50%)",
    NaturalDisaster: 43,
    NaturalDisasterColor: "hsl(110, 70%, 50%)",
    Medical: 83,
    MedicalColor: "hsl(9, 70%, 50%)",
  },
  {
    City: "KAR",
    "Education": 81,
    "EducationColor": "hsl(190, 70%, 50%)",
    Meals: 80,
    MealsColor: "hsl(325, 70%, 50%)",
    NaturalDisaster: 112,
    NaturalDisasterColor: "hsl(54, 70%, 50%)",
    Medical: 35,
    MedicalColor: "hsl(285, 70%, 50%)",
  },
  {
    City: "MUR",
    "Education": 66,
    "EducationColor": "hsl(208, 70%, 50%)",
    Meals: 111,
    MealsColor: "hsl(334, 70%, 50%)",
    NaturalDisaster: 167,
    NaturalDisasterColor: "hsl(182, 70%, 50%)",
    Medical: 18,
    MedicalColor: "hsl(76, 70%, 50%)",
  },
  {
    City: "LHO",
    "Education": 80,
    "EducationColor": "hsl(87, 70%, 50%)",
    Meals: 47,
    MealsColor: "hsl(141, 70%, 50%)",
    NaturalDisaster: 158,
    NaturalDisasterColor: "hsl(224, 70%, 50%)",
    Medical: 49,
    MedicalColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "Education",
    label: "Education",
    value: 503,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Meals",
    label: "Meals",
    value: 322,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "NaturalDisaster",
    label: "NaturalDisaster",
    value: 170,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "Medical",
    label: "Medical",
    value: 239,
    color: "hsl(162, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "Education",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "January",
        y: 101,
      },
      {
        x: "February",
        y: 75,
      },
      {
        x: "March",
        y: 36,
      },
      {
        x: "April",
        y: 216,
      },
      {
        x: "May",
        y: 35,
      },
      {
        x: "June",
        y: 236,
      },
      {
        x: "July",
        y: 88,
      },
      {
        x: "August",
        y: 232,
      },
      {
        x: "September",
        y: 281,
      },
      {
        x: "October",
        y: 1,
      },
      {
        x: "November",
        y: 35,
      },
      {
        x: "December",
        y: 14,
      },
    ],
  },
  {
    id: "Meals",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "January",
        y: 212,
      },
      {
        x: "February",
        y: 190,
      },
      {
        x: "March",
        y: 270,
      },
      {
        x: "April",
        y: 9,
      },
      {
        x: "May",
        y: 75,
      },
      {
        x: "June",
        y: 175,
      },
      {
        x: "July",
        y: 33,
      },
      {
        x: "August",
        y: 189,
      },
      {
        x: "September",
        y: 97,
      },
      {
        x: "October",
        y: 87,
      },
      {
        x: "November",
        y: 299,
      },
      {
        x: "December",
        y: 251,
      },
    ],
  },
  {
    id: "NaturalDisaster",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "January",
        y: 191,
      },
      {
        x: "February",
        y: 136,
      },
      {
        x: "March",
        y: 91,
      },
      {
        x: "April",
        y: 190,
      },
      {
        x: "May",
        y: 211,
      },
      {
        x: "June",
        y: 152,
      },
      {
        x: "July",
        y: 189,
      },
      {
        x: "August",
        y: 152,
      },
      {
        x: "September",
        y: 8,
      },
      {
        x: "October",
        y: 197,
      },
      {
        x: "November",
        y: 107,
      },
      {
        x: "December",
        y: 170,
      },
    ],
  },
  {
    id: "Medical",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "January",
        y: 110,
      },
      {
        x: "February",
        y: 67,
      },
      {
        x: "March",
        y: 90,
      },
      {
        x: "April",
        y: 55,
      },
      {
        x: "May",
        y: 70,
      },
      {
        x: "June",
        y: 122,
      },
      {
        x: "July",
        y: 208,
      },
      {
        x: "August",
        y: 259,
      },
      {
        x: "September",
        y: 199,
      },
      {
        x: "October",
        y: 120,
      },
      {
        x: "November",
        y: 107,
      },
      {
        x: "December",
        y: 90,
      },
    ],
  },
];

export const mockCampaignLineData = [
  {
    id: "Donations",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "Monday",
        y: 101,
      },
      {
        x: "Tuesday",
        y: 75,
      },
      {
        x: "Wednesday",
        y: 36,
      },
      {
        x: "Thursday",
        y: 116,
      },
      {
        x: "Friday",
        y: 222,
      },
      {
        x: "Saturday",
        y: 236,
      },
      {
        x: "Sunday",
        y: 88,
      },
    ],
  },
];

export const mockUserLineData = [
  {
    id: "Donations",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "January",
        y: 110,
      },
      {
        x: "February",
        y: 67,
      },
      {
        x: "March",
        y: 90,
      },
      {
        x: "April",
        y: 55,
      },
      {
        x: "May",
        y: 70,
      },
      {
        x: "June",
        y: 122,
      },
      {
        x: "July",
        y: 208,
      },
      {
        x: "August",
        y: 259,
      },
      {
        x: "September",
        y: 199,
      },
      {
        x: "October",
        y: 120,
      },
      {
        x: "November",
        y: 107,
      },
      {
        x: "December",
        y: 90,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AUS",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];

export const activityData = [
  {
    "value": 209,
    "day": "2015-08-18"
  },
  {
    "value": 139,
    "day": "2015-04-20"
  },
  {
    "value": 307,
    "day": "2016-10-23"
  },
  {
    "value": 149,
    "day": "2016-03-27"
  },
  {
    "value": 373,
    "day": "2015-06-08"
  },
  {
    "value": 118,
    "day": "2015-10-03"
  },
  {
    "value": 380,
    "day": "2016-04-07"
  },
  {
    "value": 146,
    "day": "2021-09-07"
  },
  {
    "value": 59,
    "day": "2018-07-02"
  },
  {
    "value": 185,
    "day": "2021-12-10"
  },
  {
    "value": 58,
    "day": "2016-09-01"
  },
  {
    "value": 336,
    "day": "2021-08-09"
  },
  {
    "value": 349,
    "day": "2016-05-03"
  },
  {
    "value": 392,
    "day": "2016-06-24"
  },
  {
    "value": 335,
    "day": "2015-07-05"
  },
  {
    "value": 45,
    "day": "2021-05-04"
  },
  {
    "value": 279,
    "day": "2016-10-11"
  },
  {
    "value": 40,
    "day": "2016-04-24"
  },
  {
    "value": 336,
    "day": "2015-12-03"
  },
  {
    "value": 304,
    "day": "2016-01-04"
  },
  {
    "value": 313,
    "day": "2018-07-21"
  },
  {
    "value": 138,
    "day": "2016-11-02"
  },
  {
    "value": 118,
    "day": "2018-05-28"
  },
  {
    "value": 43,
    "day": "2015-11-10"
  },
  {
    "value": 277,
    "day": "2021-10-30"
  },
  {
    "value": 80,
    "day": "2021-08-24"
  },
  {
    "value": 332,
    "day": "2021-08-04"
  },
  {
    "value": 170,
    "day": "2021-05-21"
  },
  {
    "value": 192,
    "day": "2021-04-24"
  },
  {
    "value": 232,
    "day": "2015-12-28"
  },
  {
    "value": 334,
    "day": "2018-01-14"
  },
  {
    "value": 264,
    "day": "2021-03-08"
  },
  {
    "value": 48,
    "day": "2015-11-19"
  },
  {
    "value": 109,
    "day": "2016-02-18"
  },
  {
    "value": 267,
    "day": "2015-09-02"
  },
  {
    "value": 135,
    "day": "2015-12-20"
  },
  {
    "value": 107,
    "day": "2018-05-20"
  },
  {
    "value": 349,
    "day": "2016-02-11"
  },
  {
    "value": 194,
    "day": "2015-12-23"
  },
  {
    "value": 129,
    "day": "2016-07-21"
  },
  {
    "value": 321,
    "day": "2018-08-09"
  },
  {
    "value": 221,
    "day": "2018-01-09"
  },
  {
    "value": 8,
    "day": "2016-11-08"
  },
  {
    "value": 329,
    "day": "2018-05-31"
  },
  {
    "value": 133,
    "day": "2015-11-08"
  },
  {
    "value": 265,
    "day": "2016-04-30"
  },
  {
    "value": 109,
    "day": "2015-05-04"
  },
  {
    "value": 266,
    "day": "2015-12-13"
  },
  {
    "value": 76,
    "day": "2018-02-16"
  },
  {
    "value": 319,
    "day": "2015-10-23"
  },
  {
    "value": 175,
    "day": "2015-08-30"
  },
  {
    "value": 219,
    "day": "2021-07-04"
  },
  {
    "value": 358,
    "day": "2021-04-11"
  },
  {
    "value": 99,
    "day": "2016-06-05"
  },
  {
    "value": 291,
    "day": "2016-10-05"
  },
  {
    "value": 132,
    "day": "2018-06-24"
  },
  {
    "value": 85,
    "day": "2021-01-07"
  },
  {
    "value": 243,
    "day": "2015-10-06"
  },
  {
    "value": 313,
    "day": "2021-02-01"
  },
  {
    "value": 218,
    "day": "2016-01-08"
  },
  {
    "value": 319,
    "day": "2018-02-06"
  },
  {
    "value": 224,
    "day": "2021-08-10"
  },
  {
    "value": 2,
    "day": "2021-12-08"
  },
  {
    "value": 7,
    "day": "2015-05-10"
  },
  {
    "value": 291,
    "day": "2021-10-20"
  },
  {
    "value": 266,
    "day": "2016-06-26"
  },
  {
    "value": 139,
    "day": "2018-05-25"
  },
  {
    "value": 133,
    "day": "2015-05-17"
  },
  {
    "value": 108,
    "day": "2018-01-15"
  },
  {
    "value": 87,
    "day": "2021-03-03"
  },
  {
    "value": 331,
    "day": "2018-07-13"
  },
  {
    "value": 164,
    "day": "2016-01-21"
  },
  {
    "value": 77,
    "day": "2016-09-11"
  },
  {
    "value": 55,
    "day": "2015-12-29"
  },
  {
    "value": 176,
    "day": "2021-06-23"
  },
  {
    "value": 151,
    "day": "2021-12-07"
  },
  {
    "value": 196,
    "day": "2018-03-24"
  },
  {
    "value": 14,
    "day": "2015-08-12"
  },
  {
    "value": 234,
    "day": "2015-05-05"
  },
  {
    "value": 238,
    "day": "2021-01-18"
  },
  {
    "value": 367,
    "day": "2021-05-27"
  },
  {
    "value": 339,
    "day": "2018-04-13"
  },
  {
    "value": 44,
    "day": "2016-12-17"
  },
  {
    "value": 41,
    "day": "2016-08-24"
  },
  {
    "value": 237,
    "day": "2015-09-27"
  },
  {
    "value": 297,
    "day": "2018-01-20"
  },
  {
    "value": 370,
    "day": "2015-09-19"
  },
  {
    "value": 98,
    "day": "2021-07-05"
  },
  {
    "value": 285,
    "day": "2021-05-14"
  },
  {
    "value": 263,
    "day": "2021-09-30"
  },
  {
    "value": 85,
    "day": "2016-06-23"
  },
  {
    "value": 98,
    "day": "2016-09-21"
  },
  {
    "value": 32,
    "day": "2018-06-20"
  },
  {
    "value": 7,
    "day": "2016-07-30"
  },
  {
    "value": 128,
    "day": "2016-12-10"
  },
  {
    "value": 239,
    "day": "2018-06-22"
  },
  {
    "value": 232,
    "day": "2018-02-26"
  },
  {
    "value": 198,
    "day": "2018-03-27"
  },
  {
    "value": 365,
    "day": "2021-12-23"
  },
  {
    "value": 163,
    "day": "2016-11-28"
  },
  {
    "value": 393,
    "day": "2021-12-31"
  },
  {
    "value": 43,
    "day": "2021-08-15"
  },
  {
    "value": 200,
    "day": "2018-04-11"
  },
  {
    "value": 306,
    "day": "2016-06-10"
  },
  {
    "value": 14,
    "day": "2021-03-16"
  },
  {
    "value": 66,
    "day": "2021-10-18"
  },
  {
    "value": 279,
    "day": "2018-03-21"
  },
  {
    "value": 169,
    "day": "2021-10-06"
  },
  {
    "value": 276,
    "day": "2016-07-20"
  },
  {
    "value": 103,
    "day": "2015-07-21"
  },
  {
    "value": 98,
    "day": "2015-08-28"
  },
  {
    "value": 397,
    "day": "2021-06-09"
  },
  {
    "value": 366,
    "day": "2016-07-31"
  },
  {
    "value": 116,
    "day": "2016-06-11"
  },
  {
    "value": 358,
    "day": "2021-10-07"
  },
  {
    "value": 216,
    "day": "2018-03-26"
  },
  {
    "value": 48,
    "day": "2021-08-03"
  },
  {
    "value": 252,
    "day": "2018-04-08"
  },
  {
    "value": 92,
    "day": "2016-11-24"
  },
  {
    "value": 53,
    "day": "2015-08-10"
  },
  {
    "value": 248,
    "day": "2015-08-31"
  },
  {
    "value": 305,
    "day": "2021-01-11"
  },
  {
    "value": 126,
    "day": "2015-06-27"
  },
  {
    "value": 297,
    "day": "2015-06-16"
  },
  {
    "value": 58,
    "day": "2021-11-28"
  },
  {
    "value": 395,
    "day": "2018-03-12"
  },
  {
    "value": 127,
    "day": "2021-04-22"
  },
  {
    "value": 0,
    "day": "2018-04-14"
  },
  {
    "value": 92,
    "day": "2016-02-08"
  },
  {
    "value": 19,
    "day": "2015-10-25"
  },
  {
    "value": 338,
    "day": "2021-05-02"
  },
  {
    "value": 156,
    "day": "2018-03-23"
  },
  {
    "value": 186,
    "day": "2016-06-09"
  },
  {
    "value": 319,
    "day": "2021-03-19"
  },
  {
    "value": 337,
    "day": "2016-06-14"
  },
  {
    "value": 167,
    "day": "2018-06-15"
  },
  {
    "value": 180,
    "day": "2021-02-03"
  },
  {
    "value": 81,
    "day": "2015-06-04"
  },
  {
    "value": 349,
    "day": "2021-05-10"
  },
  {
    "value": 190,
    "day": "2016-01-26"
  },
  {
    "value": 102,
    "day": "2021-07-13"
  },
  {
    "value": 230,
    "day": "2015-10-10"
  },
  {
    "value": 292,
    "day": "2018-03-16"
  },
  {
    "value": 238,
    "day": "2018-07-11"
  },
  {
    "value": 399,
    "day": "2018-04-21"
  },
  {
    "value": 106,
    "day": "2016-07-14"
  },
  {
    "value": 271,
    "day": "2016-12-12"
  },
  {
    "value": 3,
    "day": "2021-06-06"
  },
  {
    "value": 251,
    "day": "2018-07-31"
  },
  {
    "value": 163,
    "day": "2016-09-12"
  },
  {
    "value": 54,
    "day": "2016-03-11"
  },
  {
    "value": 126,
    "day": "2016-04-19"
  },
  {
    "value": 328,
    "day": "2018-08-05"
  },
  {
    "value": 178,
    "day": "2021-04-14"
  },
  {
    "value": 226,
    "day": "2015-12-26"
  },
  {
    "value": 6,
    "day": "2016-05-08"
  },
  {
    "value": 342,
    "day": "2021-04-27"
  },
  {
    "value": 3,
    "day": "2021-06-05"
  },
  {
    "value": 38,
    "day": "2021-01-14"
  },
  {
    "value": 67,
    "day": "2016-01-31"
  },
  {
    "value": 36,
    "day": "2021-03-29"
  },
  {
    "value": 160,
    "day": "2015-06-15"
  },
  {
    "value": 295,
    "day": "2021-01-06"
  },
  {
    "value": 363,
    "day": "2021-05-12"
  },
  {
    "value": 316,
    "day": "2015-07-04"
  },
  {
    "value": 351,
    "day": "2018-07-23"
  },
  {
    "value": 146,
    "day": "2015-04-13"
  },
  {
    "value": 395,
    "day": "2016-08-15"
  },
  {
    "value": 76,
    "day": "2015-08-23"
  },
  {
    "value": 41,
    "day": "2016-03-25"
  },
  {
    "value": 152,
    "day": "2021-06-19"
  },
  {
    "value": 295,
    "day": "2021-12-06"
  },
  {
    "value": 87,
    "day": "2021-12-27"
  },
  {
    "value": 239,
    "day": "2021-04-07"
  },
  {
    "value": 293,
    "day": "2021-06-10"
  },
  {
    "value": 349,
    "day": "2016-05-21"
  },
  {
    "value": 171,
    "day": "2016-09-26"
  },
  {
    "value": 104,
    "day": "2021-08-23"
  },
  {
    "value": 151,
    "day": "2015-11-07"
  },
  {
    "value": 55,
    "day": "2015-10-11"
  },
  {
    "value": 309,
    "day": "2021-10-03"
  },
  {
    "value": 241,
    "day": "2018-02-19"
  },
  {
    "value": 132,
    "day": "2021-02-26"
  },
  {
    "value": 292,
    "day": "2016-06-16"
  },
  {
    "value": 141,
    "day": "2015-07-18"
  },
  {
    "value": 323,
    "day": "2015-09-04"
  },
  {
    "value": 48,
    "day": "2015-05-16"
  },
  {
    "value": 188,
    "day": "2016-07-26"
  },
  {
    "value": 63,
    "day": "2021-05-17"
  },
  {
    "value": 313,
    "day": "2016-09-10"
  },
  {
    "value": 178,
    "day": "2021-05-01"
  },
  {
    "value": 299,
    "day": "2021-02-25"
  },
  {
    "value": 362,
    "day": "2021-02-27"
  },
  {
    "value": 37,
    "day": "2018-04-16"
  },
  {
    "value": 135,
    "day": "2016-01-05"
  },
  {
    "value": 85,
    "day": "2016-07-25"
  },
  {
    "value": 171,
    "day": "2018-01-07"
  },
  {
    "value": 86,
    "day": "2021-02-12"
  },
  {
    "value": 80,
    "day": "2016-03-17"
  },
  {
    "value": 363,
    "day": "2018-01-12"
  },
  {
    "value": 277,
    "day": "2016-09-16"
  },
  {
    "value": 33,
    "day": "2015-07-30"
  },
  {
    "value": 334,
    "day": "2018-07-19"
  },
  {
    "value": 165,
    "day": "2016-05-26"
  },
  {
    "value": 354,
    "day": "2018-07-07"
  },
  {
    "value": 95,
    "day": "2016-04-26"
  },
  {
    "value": 375,
    "day": "2015-07-02"
  },
  {
    "value": 148,
    "day": "2021-09-26"
  },
  {
    "value": 249,
    "day": "2021-02-22"
  },
  {
    "value": 207,
    "day": "2021-08-05"
  },
  {
    "value": 134,
    "day": "2016-09-08"
  },
  {
    "value": 109,
    "day": "2015-06-13"
  },
  {
    "value": 357,
    "day": "2021-11-03"
  },
  {
    "value": 303,
    "day": "2021-01-24"
  },
  {
    "value": 277,
    "day": "2021-09-19"
  },
  {
    "value": 240,
    "day": "2016-05-22"
  },
  {
    "value": 216,
    "day": "2015-09-23"
  },
  {
    "value": 248,
    "day": "2021-10-16"
  },
  {
    "value": 287,
    "day": "2021-11-17"
  },
  {
    "value": 325,
    "day": "2016-02-10"
  },
  {
    "value": 275,
    "day": "2016-11-03"
  },
  {
    "value": 367,
    "day": "2021-12-28"
  },
  {
    "value": 169,
    "day": "2016-02-17"
  },
  {
    "value": 263,
    "day": "2021-04-15"
  },
  {
    "value": 313,
    "day": "2021-02-08"
  },
  {
    "value": 76,
    "day": "2021-01-04"
  },
  {
    "value": 259,
    "day": "2021-08-21"
  },
  {
    "value": 88,
    "day": "2015-12-14"
  },
  {
    "value": 54,
    "day": "2018-07-16"
  },
  {
    "value": 397,
    "day": "2018-01-04"
  },
  {
    "value": 299,
    "day": "2015-05-20"
  },
  {
    "value": 2,
    "day": "2021-02-28"
  },
  {
    "value": 341,
    "day": "2021-07-03"
  },
  {
    "value": 61,
    "day": "2015-11-29"
  },
  {
    "value": 12,
    "day": "2016-08-12"
  },
  {
    "value": 385,
    "day": "2015-11-09"
  },
  {
    "value": 116,
    "day": "2018-06-04"
  },
  {
    "value": 193,
    "day": "2018-03-30"
  },
  {
    "value": 274,
    "day": "2018-02-20"
  },
  {
    "value": 192,
    "day": "2021-02-16"
  },
  {
    "value": 205,
    "day": "2016-06-02"
  },
  {
    "value": 396,
    "day": "2015-10-12"
  },
  {
    "value": 21,
    "day": "2018-06-28"
  },
  {
    "value": 17,
    "day": "2021-03-27"
  },
  {
    "value": 159,
    "day": "2021-11-18"
  },
  {
    "value": 299,
    "day": "2016-03-06"
  },
  {
    "value": 132,
    "day": "2016-01-25"
  },
  {
    "value": 291,
    "day": "2016-12-24"
  },
  {
    "value": 74,
    "day": "2021-11-25"
  },
  {
    "value": 214,
    "day": "2021-11-27"
  },
  {
    "value": 209,
    "day": "2021-05-13"
  },
  {
    "value": 162,
    "day": "2016-01-22"
  },
  {
    "value": 218,
    "day": "2018-05-02"
  },
  {
    "value": 165,
    "day": "2018-07-04"
  },
  {
    "value": 125,
    "day": "2021-10-31"
  },
  {
    "value": 91,
    "day": "2021-01-21"
  },
  {
    "value": 393,
    "day": "2015-05-30"
  },
  {
    "value": 339,
    "day": "2021-09-09"
  },
  {
    "value": 292,
    "day": "2018-02-18"
  },
  {
    "value": 25,
    "day": "2021-07-29"
  },
  {
    "value": 47,
    "day": "2016-03-12"
  },
  {
    "value": 175,
    "day": "2016-01-20"
  },
  {
    "value": 188,
    "day": "2016-03-08"
  },
  {
    "value": 393,
    "day": "2021-11-01"
  },
  {
    "value": 123,
    "day": "2016-08-06"
  },
  {
    "value": 351,
    "day": "2016-11-14"
  },
  {
    "value": 377,
    "day": "2015-06-03"
  },
  {
    "value": 240,
    "day": "2015-05-09"
  },
  {
    "value": 159,
    "day": "2021-02-05"
  },
  {
    "value": 3,
    "day": "2021-04-25"
  },
  {
    "value": 35,
    "day": "2016-07-03"
  },
  {
    "value": 57,
    "day": "2016-11-05"
  },
  {
    "value": 77,
    "day": "2015-04-18"
  },
  {
    "value": 211,
    "day": "2015-04-14"
  },
  {
    "value": 310,
    "day": "2021-08-30"
  },
  {
    "value": 318,
    "day": "2016-12-27"
  },
  {
    "value": 147,
    "day": "2021-07-14"
  },
  {
    "value": 260,
    "day": "2021-08-14"
  },
  {
    "value": 216,
    "day": "2016-06-12"
  },
  {
    "value": 356,
    "day": "2016-05-02"
  },
  {
    "value": 101,
    "day": "2018-01-27"
  },
  {
    "value": 342,
    "day": "2021-02-14"
  },
  {
    "value": 249,
    "day": "2015-05-14"
  },
  {
    "value": 243,
    "day": "2016-09-23"
  },
  {
    "value": 375,
    "day": "2016-10-01"
  },
  {
    "value": 392,
    "day": "2015-09-21"
  },
  {
    "value": 20,
    "day": "2016-02-13"
  },
  {
    "value": 20,
    "day": "2016-09-02"
  },
  {
    "value": 347,
    "day": "2016-05-12"
  },
  {
    "value": 154,
    "day": "2018-07-08"
  },
  {
    "value": 262,
    "day": "2018-04-29"
  },
  {
    "value": 55,
    "day": "2021-09-17"
  },
  {
    "value": 185,
    "day": "2016-01-06"
  },
  {
    "value": 16,
    "day": "2016-12-14"
  },
  {
    "value": 294,
    "day": "2021-03-26"
  },
  {
    "value": 378,
    "day": "2021-05-24"
  },
  {
    "value": 203,
    "day": "2016-03-10"
  },
  {
    "value": 116,
    "day": "2021-12-21"
  },
  {
    "value": 218,
    "day": "2018-07-09"
  },
  {
    "value": 203,
    "day": "2018-07-05"
  },
  {
    "value": 85,
    "day": "2018-01-29"
  },
  {
    "value": 249,
    "day": "2016-04-03"
  },
  {
    "value": 79,
    "day": "2016-09-03"
  },
  {
    "value": 391,
    "day": "2018-02-27"
  },
  {
    "value": 335,
    "day": "2016-08-08"
  },
  {
    "value": 323,
    "day": "2021-12-20"
  },
  {
    "value": 32,
    "day": "2016-10-15"
  },
  {
    "value": 291,
    "day": "2015-05-15"
  },
  {
    "value": 55,
    "day": "2018-01-08"
  },
  {
    "value": 120,
    "day": "2015-06-18"
  },
  {
    "value": 103,
    "day": "2016-02-15"
  },
  {
    "value": 139,
    "day": "2016-05-28"
  },
  {
    "value": 132,
    "day": "2021-10-12"
  },
  {
    "value": 132,
    "day": "2015-12-01"
  },
  {
    "value": 185,
    "day": "2016-02-21"
  },
  {
    "value": 137,
    "day": "2016-08-03"
  },
  {
    "value": 326,
    "day": "2015-10-26"
  },
  {
    "value": 337,
    "day": "2016-06-17"
  },
  {
    "value": 379,
    "day": "2015-06-07"
  },
  {
    "value": 201,
    "day": "2015-10-19"
  },
  {
    "value": 207,
    "day": "2015-08-02"
  },
  {
    "value": 287,
    "day": "2021-12-18"
  },
  {
    "value": 296,
    "day": "2021-11-26"
  },
  {
    "value": 151,
    "day": "2021-06-15"
  },
  {
    "value": 20,
    "day": "2015-12-18"
  },
  {
    "value": 294,
    "day": "2015-10-29"
  },
  {
    "value": 299,
    "day": "2018-03-20"
  },
  {
    "value": 32,
    "day": "2016-06-03"
  },
  {
    "value": 163,
    "day": "2015-09-28"
  },
  {
    "value": 164,
    "day": "2015-07-03"
  },
  {
    "value": 280,
    "day": "2018-04-07"
  },
  {
    "value": 384,
    "day": "2015-06-28"
  },
  {
    "value": 271,
    "day": "2015-07-26"
  },
  {
    "value": 8,
    "day": "2018-04-04"
  },
  {
    "value": 207,
    "day": "2018-04-06"
  },
  {
    "value": 393,
    "day": "2021-01-30"
  },
  {
    "value": 347,
    "day": "2016-04-11"
  },
  {
    "value": 387,
    "day": "2016-09-29"
  },
  {
    "value": 310,
    "day": "2016-12-28"
  },
  {
    "value": 379,
    "day": "2021-03-06"
  },
  {
    "value": 90,
    "day": "2015-12-21"
  },
  {
    "value": 6,
    "day": "2021-02-23"
  },
  {
    "value": 275,
    "day": "2015-05-08"
  },
  {
    "value": 199,
    "day": "2015-11-04"
  },
  {
    "value": 279,
    "day": "2021-03-28"
  },
  {
    "value": 389,
    "day": "2021-08-27"
  },
  {
    "value": 102,
    "day": "2018-03-17"
  },
  {
    "value": 257,
    "day": "2018-02-25"
  },
  {
    "value": 53,
    "day": "2021-03-05"
  },
  {
    "value": 323,
    "day": "2016-07-12"
  },
  {
    "value": 222,
    "day": "2021-10-28"
  },
  {
    "value": 136,
    "day": "2016-05-15"
  },
  {
    "value": 150,
    "day": "2015-08-08"
  },
  {
    "value": 375,
    "day": "2015-05-03"
  },
  {
    "value": 289,
    "day": "2015-10-20"
  },
  {
    "value": 243,
    "day": "2021-12-04"
  },
  {
    "value": 58,
    "day": "2016-10-29"
  },
  {
    "value": 369,
    "day": "2021-06-28"
  },
  {
    "value": 61,
    "day": "2021-09-25"
  },
  {
    "value": 279,
    "day": "2015-07-19"
  },
  {
    "value": 500,
    "day": "2021-01-09"
  },
  {
    "value": 208,
    "day": "2016-12-13"
  },
  {
    "value": 236,
    "day": "2021-11-29"
  },
  {
    "value": 179,
    "day": "2016-08-16"
  },
  {
    "value": 104,
    "day": "2021-11-10"
  },
  {
    "value": 3,
    "day": "2021-03-30"
  },
  {
    "value": 373,
    "day": "2018-07-29"
  },
  {
    "value": 379,
    "day": "2018-08-08"
  },
  {
    "value": 356,
    "day": "2015-04-19"
  },
  {
    "value": 75,
    "day": "2016-02-27"
  },
  {
    "value": 325,
    "day": "2021-06-17"
  },
  {
    "value": 266,
    "day": "2018-05-29"
  },
  {
    "value": 34,
    "day": "2015-08-03"
  },
  {
    "value": 96,
    "day": "2016-10-20"
  },
  {
    "value": 48,
    "day": "2016-09-20"
  },
  {
    "value": 200,
    "day": "2016-08-10"
  },
  {
    "value": 376,
    "day": "2015-08-09"
  },
  {
    "value": 337,
    "day": "2016-01-09"
  },
  {
    "value": 381,
    "day": "2016-03-23"
  },
  {
    "value": 215,
    "day": "2018-03-31"
  },
  {
    "value": 231,
    "day": "2018-07-22"
  },
  {
    "value": 180,
    "day": "2021-09-11"
  },
  {
    "value": 126,
    "day": "2018-03-09"
  },
  {
    "value": 378,
    "day": "2015-10-15"
  },
  {
    "value": 281,
    "day": "2015-12-17"
  },
  {
    "value": 27,
    "day": "2021-10-09"
  },
  {
    "value": 289,
    "day": "2018-07-24"
  },
  {
    "value": 236,
    "day": "2021-01-15"
  },
  {
    "value": 305,
    "day": "2015-11-06"
  },
  {
    "value": 326,
    "day": "2021-10-13"
  },
  {
    "value": 237,
    "day": "2021-01-10"
  },
  {
    "value": 203,
    "day": "2016-06-20"
  },
  {
    "value": 362,
    "day": "2021-08-17"
  },
  {
    "value": 263,
    "day": "2016-11-07"
  },
  {
    "value": 211,
    "day": "2018-01-18"
  },
  {
    "value": 395,
    "day": "2016-10-16"
  },
  {
    "value": 29,
    "day": "2016-08-28"
  },
  {
    "value": 367,
    "day": "2016-01-15"
  },
  {
    "value": 166,
    "day": "2016-04-17"
  },
  {
    "value": 360,
    "day": "2018-04-28"
  },
  {
    "value": 302,
    "day": "2018-06-06"
  },
  {
    "value": 309,
    "day": "2018-03-13"
  },
  {
    "value": 5,
    "day": "2021-03-20"
  },
  {
    "value": 318,
    "day": "2016-04-27"
  },
  {
    "value": 247,
    "day": "2016-05-20"
  },
  {
    "value": 100,
    "day": "2016-02-12"
  },
  {
    "value": 86,
    "day": "2016-09-24"
  },
  {
    "value": 316,
    "day": "2015-11-12"
  },
  {
    "value": 341,
    "day": "2018-04-24"
  },
  {
    "value": 209,
    "day": "2015-09-22"
  },
  {
    "value": 87,
    "day": "2016-05-09"
  },
  {
    "value": 23,
    "day": "2016-07-08"
  },
  {
    "value": 126,
    "day": "2016-05-24"
  },
  {
    "value": 137,
    "day": "2018-06-26"
  },
  {
    "value": 271,
    "day": "2016-12-11"
  },
  {
    "value": 221,
    "day": "2018-01-26"
  },
  {
    "value": 335,
    "day": "2021-01-13"
  },
  {
    "value": 154,
    "day": "2015-06-14"
  },
  {
    "value": 234,
    "day": "2015-10-17"
  },
  {
    "value": 326,
    "day": "2021-01-17"
  },
  {
    "value": 59,
    "day": "2021-12-09"
  },
  {
    "value": 157,
    "day": "2016-04-16"
  },
  {
    "value": 52,
    "day": "2021-02-02"
  },
  {
    "value": 10,
    "day": "2018-07-25"
  },
  {
    "value": 247,
    "day": "2018-02-28"
  },
  {
    "value": 359,
    "day": "2021-04-16"
  },
  {
    "value": 365,
    "day": "2018-02-17"
  },
  {
    "value": 288,
    "day": "2015-05-11"
  },
  {
    "value": 278,
    "day": "2018-01-19"
  },
  {
    "value": 118,
    "day": "2021-01-27"
  },
  {
    "value": 245,
    "day": "2015-05-01"
  },
  {
    "value": 110,
    "day": "2021-11-06"
  },
  {
    "value": 382,
    "day": "2018-07-17"
  },
  {
    "value": 295,
    "day": "2018-04-20"
  },
  {
    "value": 124,
    "day": "2016-09-15"
  },
  {
    "value": 108,
    "day": "2021-05-07"
  },
  {
    "value": 197,
    "day": "2018-03-05"
  },
  {
    "value": 189,
    "day": "2016-01-13"
  },
  {
    "value": 344,
    "day": "2015-07-28"
  },
  {
    "value": 277,
    "day": "2021-03-13"
  },
  {
    "value": 62,
    "day": "2015-09-01"
  },
  {
    "value": 108,
    "day": "2021-04-10"
  },
  {
    "value": 364,
    "day": "2021-02-04"
  },
  {
    "value": 296,
    "day": "2015-08-15"
  },
  {
    "value": 261,
    "day": "2016-01-23"
  },
  {
    "value": 8,
    "day": "2021-01-22"
  },
  {
    "value": 368,
    "day": "2021-04-06"
  },
  {
    "value": 275,
    "day": "2018-06-07"
  },
  {
    "value": 101,
    "day": "2016-07-05"
  },
  {
    "value": 218,
    "day": "2015-04-17"
  },
  {
    "value": 140,
    "day": "2015-08-20"
  },
  {
    "value": 367,
    "day": "2016-03-28"
  },
  {
    "value": 379,
    "day": "2018-08-06"
  },
  {
    "value": 192,
    "day": "2021-05-22"
  },
  {
    "value": 138,
    "day": "2021-04-29"
  },
  {
    "value": 79,
    "day": "2015-11-26"
  },
  {
    "value": 29,
    "day": "2016-01-10"
  },
  {
    "value": 224,
    "day": "2021-04-01"
  },
  {
    "value": 86,
    "day": "2015-11-01"
  },
  {
    "value": 375,
    "day": "2016-07-29"
  },
  {
    "value": 252,
    "day": "2016-08-30"
  },
  {
    "value": 203,
    "day": "2018-04-03"
  },
  {
    "value": 356,
    "day": "2016-04-28"
  },
  {
    "value": 20,
    "day": "2015-09-07"
  },
  {
    "value": 172,
    "day": "2016-01-16"
  },
  {
    "value": 360,
    "day": "2016-11-01"
  },
  {
    "value": 121,
    "day": "2015-09-15"
  },
  {
    "value": 170,
    "day": "2021-08-11"
  },
  {
    "value": 85,
    "day": "2015-06-12"
  },
  {
    "value": 3,
    "day": "2015-04-22"
  },
  {
    "value": 41,
    "day": "2016-10-30"
  },
  {
    "value": 1,
    "day": "2015-04-25"
  },
  {
    "value": 395,
    "day": "2018-07-28"
  },
  {
    "value": 30,
    "day": "2015-10-08"
  },
  {
    "value": 330,
    "day": "2021-10-17"
  },
  {
    "value": 42,
    "day": "2015-09-13"
  },
  {
    "value": 124,
    "day": "2018-05-13"
  },
  {
    "value": 293,
    "day": "2015-12-15"
  },
  {
    "value": 102,
    "day": "2016-07-15"
  },
  {
    "value": 183,
    "day": "2016-10-08"
  },
  {
    "value": 391,
    "day": "2016-08-07"
  },
  {
    "value": 173,
    "day": "2016-07-09"
  },
  {
    "value": 170,
    "day": "2016-11-29"
  },
  {
    "value": 146,
    "day": "2021-08-29"
  },
  {
    "value": 89,
    "day": "2016-04-23"
  },
  {
    "value": 388,
    "day": "2015-12-08"
  },
  {
    "value": 258,
    "day": "2016-10-10"
  },
  {
    "value": 335,
    "day": "2016-02-03"
  },
  {
    "value": 46,
    "day": "2021-02-17"
  },
  {
    "value": 149,
    "day": "2015-05-28"
  },
  {
    "value": 331,
    "day": "2015-11-17"
  },
  {
    "value": 134,
    "day": "2016-11-19"
  },
  {
    "value": 391,
    "day": "2015-05-23"
  },
  {
    "value": 82,
    "day": "2021-12-13"
  },
  {
    "value": 95,
    "day": "2016-09-25"
  },
  {
    "value": 148,
    "day": "2021-11-11"
  },
  {
    "value": 273,
    "day": "2021-08-02"
  },
  {
    "value": 345,
    "day": "2021-08-26"
  },
  {
    "value": 304,
    "day": "2018-06-01"
  },
  {
    "value": 313,
    "day": "2018-05-08"
  },
  {
    "value": 217,
    "day": "2021-05-28"
  },
  {
    "value": 180,
    "day": "2016-07-19"
  },
  {
    "value": 280,
    "day": "2018-03-15"
  },
  {
    "value": 386,
    "day": "2016-02-05"
  },
  {
    "value": 138,
    "day": "2018-02-09"
  },
  {
    "value": 342,
    "day": "2016-07-07"
  },
  {
    "value": 209,
    "day": "2016-04-29"
  },
  {
    "value": 385,
    "day": "2018-02-13"
  },
  {
    "value": 254,
    "day": "2018-04-19"
  },
  {
    "value": 15,
    "day": "2021-06-24"
  },
  {
    "value": 259,
    "day": "2016-03-30"
  },
  {
    "value": 323,
    "day": "2016-11-30"
  },
  {
    "value": 383,
    "day": "2015-07-13"
  },
  {
    "value": 129,
    "day": "2016-06-25"
  },
  {
    "value": 204,
    "day": "2015-09-29"
  },
  {
    "value": 162,
    "day": "2016-01-29"
  },
  {
    "value": 233,
    "day": "2018-03-03"
  },
  {
    "value": 51,
    "day": "2016-06-18"
  },
  {
    "value": 84,
    "day": "2016-11-23"
  },
  {
    "value": 43,
    "day": "2018-04-02"
  },
  {
    "value": 0,
    "day": "2021-06-13"
  },
  {
    "value": 40,
    "day": "2016-05-14"
  },
  {
    "value": 37,
    "day": "2015-04-07"
  },
  {
    "value": 40,
    "day": "2021-07-26"
  },
  {
    "value": 356,
    "day": "2021-09-23"
  },
  {
    "value": 332,
    "day": "2021-03-15"
  },
  {
    "value": 140,
    "day": "2018-07-06"
  },
  {
    "value": 380,
    "day": "2016-09-04"
  },
  {
    "value": 250,
    "day": "2015-06-01"
  },
  {
    "value": 153,
    "day": "2015-07-09"
  },
  {
    "value": 214,
    "day": "2018-06-13"
  },
  {
    "value": 105,
    "day": "2021-01-16"
  },
  {
    "value": 291,
    "day": "2021-05-15"
  },
  {
    "value": 108,
    "day": "2015-06-02"
  },
  {
    "value": 50,
    "day": "2016-05-07"
  },
  {
    "value": 27,
    "day": "2016-11-13"
  },
  {
    "value": 194,
    "day": "2016-08-11"
  },
  {
    "value": 338,
    "day": "2016-12-07"
  },
  {
    "value": 393,
    "day": "2016-07-06"
  },
  {
    "value": 371,
    "day": "2018-02-02"
  },
  {
    "value": 211,
    "day": "2015-11-23"
  },
  {
    "value": 393,
    "day": "2015-08-17"
  },
  {
    "value": 224,
    "day": "2016-05-19"
  },
  {
    "value": 27,
    "day": "2015-04-08"
  },
  {
    "value": 328,
    "day": "2021-04-12"
  },
  {
    "value": 19,
    "day": "2015-06-10"
  },
  {
    "value": 184,
    "day": "2021-02-13"
  },
  {
    "value": 59,
    "day": "2021-04-13"
  },
  {
    "value": 308,
    "day": "2015-07-08"
  },
  {
    "value": 33,
    "day": "2018-01-22"
  },
  {
    "value": 147,
    "day": "2016-12-02"
  },
  {
    "value": 110,
    "day": "2021-08-31"
  },
  {
    "value": 8,
    "day": "2016-11-17"
  },
  {
    "value": 40,
    "day": "2021-11-20"
  },
  {
    "value": 146,
    "day": "2021-09-27"
  },
  {
    "value": 87,
    "day": "2018-05-07"
  },
  {
    "value": 121,
    "day": "2021-09-29"
  },
  {
    "value": 95,
    "day": "2018-04-26"
  },
  {
    "value": 144,
    "day": "2016-02-09"
  },
  {
    "value": 76,
    "day": "2015-08-24"
  },
  {
    "value": 237,
    "day": "2021-06-22"
  },
  {
    "value": 65,
    "day": "2021-07-09"
  },
  {
    "value": 350,
    "day": "2018-05-09"
  },
  {
    "value": 368,
    "day": "2016-06-07"
  },
  {
    "value": 107,
    "day": "2021-12-11"
  },
  {
    "value": 65,
    "day": "2015-06-20"
  },
  {
    "value": 222,
    "day": "2016-08-25"
  },
  {
    "value": 251,
    "day": "2015-11-02"
  },
  {
    "value": 210,
    "day": "2016-09-14"
  },
  {
    "value": 128,
    "day": "2016-04-09"
  },
  {
    "value": 47,
    "day": "2016-11-09"
  },
  {
    "value": 180,
    "day": "2021-03-24"
  },
  {
    "value": 166,
    "day": "2018-05-19"
  },
  {
    "value": 358,
    "day": "2018-03-28"
  },
  {
    "value": 195,
    "day": "2016-10-02"
  },
  {
    "value": 344,
    "day": "2015-11-24"
  },
  {
    "value": 3,
    "day": "2021-07-25"
  },
  {
    "value": 294,
    "day": "2015-12-09"
  },
  {
    "value": 233,
    "day": "2016-12-31"
  },
  {
    "value": 225,
    "day": "2021-02-21"
  },
  {
    "value": 123,
    "day": "2016-02-01"
  },
  {
    "value": 364,
    "day": "2016-04-20"
  },
  {
    "value": 195,
    "day": "2016-04-21"
  },
  {
    "value": 17,
    "day": "2015-06-26"
  },
  {
    "value": 166,
    "day": "2016-10-21"
  },
  {
    "value": 271,
    "day": "2021-04-23"
  },
  {
    "value": 330,
    "day": "2018-04-17"
  },
  {
    "value": 297,
    "day": "2015-09-05"
  },
  {
    "value": 318,
    "day": "2021-07-21"
  },
  {
    "value": 177,
    "day": "2015-05-02"
  },
  {
    "value": 115,
    "day": "2016-01-19"
  },
  {
    "value": 59,
    "day": "2018-02-07"
  },
  {
    "value": 388,
    "day": "2015-09-17"
  },
  {
    "value": 383,
    "day": "2021-06-08"
  },
  {
    "value": 7,
    "day": "2015-09-09"
  },
  {
    "value": 296,
    "day": "2021-06-07"
  },
  {
    "value": 272,
    "day": "2015-07-29"
  },
  {
    "value": 296,
    "day": "2018-05-11"
  },
  {
    "value": 39,
    "day": "2021-09-13"
  },
  {
    "value": 80,
    "day": "2018-02-23"
  },
  {
    "value": 185,
    "day": "2021-04-05"
  },
  {
    "value": 232,
    "day": "2018-07-20"
  },
  {
    "value": 14,
    "day": "2018-04-15"
  },
  {
    "value": 55,
    "day": "2021-11-02"
  },
  {
    "value": 190,
    "day": "2021-09-06"
  },
  {
    "value": 81,
    "day": "2015-12-04"
  },
  {
    "value": 172,
    "day": "2021-05-20"
  },
  {
    "value": 169,
    "day": "2018-06-14"
  },
  {
    "value": 267,
    "day": "2016-09-06"
  },
  {
    "value": 377,
    "day": "2021-01-12"
  },
  {
    "value": 295,
    "day": "2016-03-14"
  },
  {
    "value": 43,
    "day": "2015-04-06"
  },
  {
    "value": 15,
    "day": "2016-12-22"
  },
  {
    "value": 390,
    "day": "2015-08-27"
  },
  {
    "value": 219,
    "day": "2021-12-01"
  },
  {
    "value": 96,
    "day": "2021-06-18"
  },
  {
    "value": 119,
    "day": "2015-12-31"
  },
  {
    "value": 386,
    "day": "2016-02-22"
  },
  {
    "value": 245,
    "day": "2021-10-23"
  },
  {
    "value": 88,
    "day": "2016-10-06"
  },
  {
    "value": 251,
    "day": "2015-09-16"
  },
  {
    "value": 204,
    "day": "2021-01-05"
  },
  {
    "value": 14,
    "day": "2016-10-31"
  },
  {
    "value": 114,
    "day": "2021-08-25"
  },
  {
    "value": 275,
    "day": "2018-01-21"
  },
  {
    "value": 261,
    "day": "2015-12-27"
  },
  {
    "value": 234,
    "day": "2016-11-27"
  },
  {
    "value": 369,
    "day": "2018-08-11"
  },
  {
    "value": 382,
    "day": "2016-11-25"
  },
  {
    "value": 297,
    "day": "2015-10-01"
  },
  {
    "value": 307,
    "day": "2018-03-22"
  },
  {
    "value": 40,
    "day": "2018-04-09"
  },
  {
    "value": 135,
    "day": "2018-04-25"
  },
  {
    "value": 341,
    "day": "2016-06-29"
  },
  {
    "value": 107,
    "day": "2015-11-21"
  },
  {
    "value": 253,
    "day": "2016-10-03"
  },
  {
    "value": 316,
    "day": "2017-12-29"
  },
  {
    "value": 181,
    "day": "2016-12-08"
  },
  {
    "value": 305,
    "day": "2018-04-01"
  },
  {
    "value": 113,
    "day": "2016-05-31"
  },
  {
    "value": 182,
    "day": "2017-01-31"
  },
  {
    "value": 22,
    "day": "2018-03-06"
  },
  {
    "value": 245,
    "day": "2018-04-23"
  },
  {
    "value": 97,
    "day": "2015-05-31"
  },
  {
    "value": 353,
    "day": "2017-03-21"
  },
  {
    "value": 84,
    "day": "2016-02-24"
  },
  {
    "value": 274,
    "day": "2015-12-24"
  },
  {
    "value": 193,
    "day": "2017-10-24"
  },
  {
    "value": 346,
    "day": "2015-08-04"
  },
  {
    "value": 224,
    "day": "2018-08-04"
  },
  {
    "value": 21,
    "day": "2017-06-21"
  },
  {
    "value": 342,
    "day": "2016-05-25"
  },
  {
    "value": 19,
    "day": "2016-12-03"
  },
  {
    "value": 34,
    "day": "2016-04-02"
  },
  {
    "value": 329,
    "day": "2016-07-28"
  },
  {
    "value": 167,
    "day": "2017-09-10"
  },
  {
    "value": 359,
    "day": "2018-06-21"
  },
  {
    "value": 73,
    "day": "2018-07-18"
  },
  {
    "value": 226,
    "day": "2018-02-08"
  },
  {
    "value": 371,
    "day": "2018-05-15"
  },
  {
    "value": 92,
    "day": "2015-08-01"
  },
  {
    "value": 5,
    "day": "2017-07-06"
  },
  {
    "value": 71,
    "day": "2017-11-09"
  },
  {
    "value": 209,
    "day": "2016-07-11"
  },
  {
    "value": 359,
    "day": "2015-08-11"
  },
  {
    "value": 356,
    "day": "2018-07-26"
  },
  {
    "value": 146,
    "day": "2017-04-08"
  },
  {
    "value": 67,
    "day": "2017-07-31"
  },
  {
    "value": 79,
    "day": "2015-05-22"
  },
  {
    "value": 227,
    "day": "2016-07-02"
  },
  {
    "value": 393,
    "day": "2018-05-24"
  },
  {
    "value": 254,
    "day": "2016-06-28"
  },
  {
    "value": 210,
    "day": "2016-01-01"
  },
  {
    "value": 344,
    "day": "2017-12-24"
  },
  {
    "value": 219,
    "day": "2018-07-30"
  },
  {
    "value": 153,
    "day": "2017-05-19"
  },
  {
    "value": 34,
    "day": "2015-05-26"
  },
  {
    "value": 34,
    "day": "2018-02-05"
  },
  {
    "value": 77,
    "day": "2016-01-24"
  },
  {
    "value": 318,
    "day": "2015-09-25"
  },
  {
    "value": 308,
    "day": "2016-04-22"
  },
  {
    "value": 7,
    "day": "2016-04-18"
  },
  {
    "value": 54,
    "day": "2017-01-01"
  },
  {
    "value": 170,
    "day": "2016-09-27"
  },
  {
    "value": 163,
    "day": "2016-07-22"
  },
  {
    "value": 206,
    "day": "2017-06-25"
  },
  {
    "value": 91,
    "day": "2015-10-04"
  },
  {
    "value": 122,
    "day": "2016-03-24"
  },
  {
    "value": 50,
    "day": "2016-08-14"
  },
  {
    "value": 252,
    "day": "2015-05-29"
  },
  {
    "value": 155,
    "day": "2018-03-07"
  },
  {
    "value": 131,
    "day": "2016-02-19"
  },
  {
    "value": 305,
    "day": "2017-05-09"
  },
  {
    "value": 252,
    "day": "2017-10-19"
  },
  {
    "value": 366,
    "day": "2015-06-25"
  },
  {
    "value": 102,
    "day": "2016-12-09"
  },
  {
    "value": 212,
    "day": "2015-11-25"
  },
  {
    "value": 397,
    "day": "2018-07-01"
  },
  {
    "value": 172,
    "day": "2018-01-16"
  },
  {
    "value": 113,
    "day": "2018-06-09"
  },
  {
    "value": 149,
    "day": "2015-07-24"
  },
  {
    "value": 159,
    "day": "2015-06-23"
  },
  {
    "value": 121,
    "day": "2015-04-29"
  },
  {
    "value": 153,
    "day": "2018-05-04"
  },
  {
    "value": 398,
    "day": "2015-07-16"
  },
  {
    "value": 321,
    "day": "2016-09-17"
  },
  {
    "value": 16,
    "day": "2015-09-12"
  },
  {
    "value": 67,
    "day": "2017-05-05"
  },
  {
    "value": 255,
    "day": "2018-02-11"
  },
  {
    "value": 261,
    "day": "2017-03-09"
  },
  {
    "value": 0,
    "day": "2017-04-02"
  },
  {
    "value": 170,
    "day": "2015-04-28"
  },
  {
    "value": 132,
    "day": "2016-05-23"
  },
  {
    "value": 93,
    "day": "2016-10-12"
  },
  {
    "value": 56,
    "day": "2018-03-02"
  },
  {
    "value": 334,
    "day": "2016-10-25"
  },
  {
    "value": 211,
    "day": "2016-09-07"
  },
  {
    "value": 357,
    "day": "2018-01-23"
  },
  {
    "value": 80,
    "day": "2016-06-27"
  },
  {
    "value": 333,
    "day": "2016-06-08"
  },
  {
    "value": 213,
    "day": "2017-05-31"
  },
  {
    "value": 40,
    "day": "2015-11-27"
  },
  {
    "value": 80,
    "day": "2017-10-22"
  },
  {
    "value": 40,
    "day": "2017-09-15"
  },
  {
    "value": 348,
    "day": "2017-02-10"
  },
  {
    "value": 200,
    "day": "2016-11-10"
  },
  {
    "value": 377,
    "day": "2017-11-15"
  },
  {
    "value": 166,
    "day": "2015-04-26"
  },
  {
    "value": 163,
    "day": "2016-04-15"
  },
  {
    "value": 347,
    "day": "2015-08-25"
  },
  {
    "value": 118,
    "day": "2017-06-29"
  },
  {
    "value": 394,
    "day": "2016-12-05"
  },
  {
    "value": 254,
    "day": "2016-10-07"
  },
  {
    "value": 207,
    "day": "2016-03-21"
  },
  {
    "value": 37,
    "day": "2018-03-25"
  },
  {
    "value": 358,
    "day": "2015-10-05"
  },
  {
    "value": 184,
    "day": "2017-07-30"
  },
  {
    "value": 302,
    "day": "2017-03-18"
  },
  {
    "value": 375,
    "day": "2017-09-24"
  },
  {
    "value": 263,
    "day": "2015-06-06"
  },
  {
    "value": 349,
    "day": "2017-08-19"
  },
  {
    "value": 342,
    "day": "2015-08-05"
  },
  {
    "value": 49,
    "day": "2017-08-13"
  },
  {
    "value": 245,
    "day": "2015-05-07"
  },
  {
    "value": 251,
    "day": "2015-08-19"
  },
  {
    "value": 381,
    "day": "2018-02-10"
  },
  {
    "value": 187,
    "day": "2017-05-30"
  },
  {
    "value": 49,
    "day": "2018-01-11"
  },
  {
    "value": 191,
    "day": "2017-02-18"
  },
  {
    "value": 319,
    "day": "2016-12-20"
  },
  {
    "value": 69,
    "day": "2016-03-29"
  },
  {
    "value": 69,
    "day": "2017-11-23"
  },
  {
    "value": 227,
    "day": "2016-08-22"
  },
  {
    "value": 275,
    "day": "2015-09-11"
  },
  {
    "value": 202,
    "day": "2015-04-16"
  },
  {
    "value": 22,
    "day": "2015-12-05"
  },
  {
    "value": 269,
    "day": "2017-03-25"
  },
  {
    "value": 274,
    "day": "2016-04-25"
  },
  {
    "value": 23,
    "day": "2017-09-02"
  },
  {
    "value": 272,
    "day": "2016-01-02"
  },
  {
    "value": 22,
    "day": "2017-04-04"
  },
  {
    "value": 193,
    "day": "2015-07-01"
  },
  {
    "value": 207,
    "day": "2016-11-15"
  },
  {
    "value": 383,
    "day": "2015-10-28"
  },
  {
    "value": 380,
    "day": "2018-05-27"
  },
  {
    "value": 135,
    "day": "2017-09-08"
  },
  {
    "value": 14,
    "day": "2017-04-17"
  },
  {
    "value": 332,
    "day": "2017-06-26"
  },
  {
    "value": 105,
    "day": "2018-08-02"
  },
  {
    "value": 23,
    "day": "2016-11-12"
  },
  {
    "value": 53,
    "day": "2016-04-05"
  },
  {
    "value": 137,
    "day": "2015-05-27"
  },
  {
    "value": 389,
    "day": "2016-08-29"
  },
  {
    "value": 305,
    "day": "2017-11-12"
  },
  {
    "value": 73,
    "day": "2015-07-17"
  },
  {
    "value": 275,
    "day": "2017-01-08"
  },
  {
    "value": 273,
    "day": "2016-04-06"
  },
  {
    "value": 150,
    "day": "2017-05-25"
  },
  {
    "value": 26,
    "day": "2017-06-14"
  },
  {
    "value": 279,
    "day": "2018-06-29"
  },
  {
    "value": 4,
    "day": "2016-12-06"
  },
  {
    "value": 275,
    "day": "2016-10-18"
  },
  {
    "value": 253,
    "day": "2016-05-01"
  },
  {
    "value": 285,
    "day": "2018-07-10"
  },
  {
    "value": 372,
    "day": "2016-03-13"
  },
  {
    "value": 369,
    "day": "2017-07-10"
  },
  {
    "value": 194,
    "day": "2015-08-14"
  },
  {
    "value": 141,
    "day": "2016-08-31"
  },
  {
    "value": 157,
    "day": "2015-05-19"
  },
  {
    "value": 91,
    "day": "2017-03-04"
  },
  {
    "value": 134,
    "day": "2016-10-19"
  },
  {
    "value": 329,
    "day": "2017-12-25"
  },
  {
    "value": 3,
    "day": "2018-08-03"
  },
  {
    "value": 104,
    "day": "2017-04-09"
  },
  {
    "value": 62,
    "day": "2017-10-25"
  },
  {
    "value": 37,
    "day": "2017-04-30"
  },
  {
    "value": 329,
    "day": "2016-11-20"
  },
  {
    "value": 89,
    "day": "2015-09-06"
  },
  {
    "value": 312,
    "day": "2018-07-12"
  },
  {
    "value": 83,
    "day": "2016-02-28"
  },
  {
    "value": 341,
    "day": "2016-03-02"
  },
  {
    "value": 320,
    "day": "2015-04-02"
  },
  {
    "value": 86,
    "day": "2017-07-28"
  },
  {
    "value": 302,
    "day": "2017-01-03"
  },
  {
    "value": 256,
    "day": "2015-08-07"
  },
  {
    "value": 204,
    "day": "2015-04-05"
  },
  {
    "value": 315,
    "day": "2017-01-25"
  },
  {
    "value": 107,
    "day": "2015-04-12"
  },
  {
    "value": 197,
    "day": "2018-08-07"
  },
  {
    "value": 262,
    "day": "2016-10-26"
  },
  {
    "value": 190,
    "day": "2017-09-22"
  },
  {
    "value": 71,
    "day": "2016-03-16"
  },
  {
    "value": 148,
    "day": "2018-03-08"
  },
  {
    "value": 198,
    "day": "2015-09-14"
  },
  {
    "value": 300,
    "day": "2018-02-24"
  },
  {
    "value": 224,
    "day": "2017-07-17"
  },
  {
    "value": 99,
    "day": "2016-06-19"
  },
  {
    "value": 14,
    "day": "2015-06-22"
  },
  {
    "value": 92,
    "day": "2016-12-01"
  },
  {
    "value": 243,
    "day": "2018-05-17"
  },
  {
    "value": 228,
    "day": "2015-07-10"
  },
  {
    "value": 234,
    "day": "2018-06-11"
  },
  {
    "value": 245,
    "day": "2016-09-28"
  },
  {
    "value": 106,
    "day": "2018-02-04"
  },
  {
    "value": 294,
    "day": "2015-06-30"
  },
  {
    "value": 36,
    "day": "2018-01-31"
  },
  {
    "value": 36,
    "day": "2015-04-30"
  },
  {
    "value": 49,
    "day": "2017-09-21"
  },
  {
    "value": 268,
    "day": "2018-06-12"
  },
  {
    "value": 85,
    "day": "2015-09-20"
  },
  {
    "value": 251,
    "day": "2016-10-04"
  },
  {
    "value": 22,
    "day": "2017-11-13"
  },
  {
    "value": 120,
    "day": "2015-10-22"
  },
  {
    "value": 99,
    "day": "2016-12-18"
  },
  {
    "value": 226,
    "day": "2016-06-13"
  },
  {
    "value": 257,
    "day": "2018-05-03"
  },
  {
    "value": 162,
    "day": "2016-07-10"
  },
  {
    "value": 382,
    "day": "2017-01-29"
  },
  {
    "value": 236,
    "day": "2016-11-16"
  },
  {
    "value": 315,
    "day": "2015-04-27"
  },
  {
    "value": 393,
    "day": "2018-03-14"
  },
  {
    "value": 4,
    "day": "2016-08-09"
  },
  {
    "value": 358,
    "day": "2017-08-22"
  },
  {
    "value": 155,
    "day": "2017-07-07"
  },
  {
    "value": 37,
    "day": "2017-08-12"
  },
  {
    "value": 49,
    "day": "2015-07-15"
  },
  {
    "value": 363,
    "day": "2017-08-07"
  },
  {
    "value": 82,
    "day": "2017-04-03"
  },
  {
    "value": 311,
    "day": "2018-04-10"
  },
  {
    "value": 381,
    "day": "2016-10-28"
  },
  {
    "value": 365,
    "day": "2017-10-05"
  },
  {
    "value": 279,
    "day": "2016-02-20"
  },
  {
    "value": 394,
    "day": "2016-01-12"
  },
  {
    "value": 216,
    "day": "2015-06-24"
  },
  {
    "value": 260,
    "day": "2018-01-03"
  },
  {
    "value": 315,
    "day": "2017-12-22"
  },
  {
    "value": 389,
    "day": "2017-07-15"
  },
  {
    "value": 211,
    "day": "2015-12-10"
  },
  {
    "value": 295,
    "day": "2016-05-11"
  },
  {
    "value": 205,
    "day": "2017-06-30"
  },
  {
    "value": 239,
    "day": "2017-07-18"
  },
  {
    "value": 264,
    "day": "2016-06-21"
  },
  {
    "value": 51,
    "day": "2016-09-05"
  },
  {
    "value": 104,
    "day": "2018-01-28"
  },
  {
    "value": 339,
    "day": "2018-06-25"
  },
  {
    "value": 119,
    "day": "2016-08-01"
  },
  {
    "value": 225,
    "day": "2015-09-18"
  },
  {
    "value": 4,
    "day": "2016-09-19"
  },
  {
    "value": 162,
    "day": "2018-04-18"
  },
  {
    "value": 107,
    "day": "2018-02-01"
  },
  {
    "value": 91,
    "day": "2017-02-20"
  },
  {
    "value": 170,
    "day": "2016-02-06"
  },
  {
    "value": 119,
    "day": "2015-07-25"
  },
  {
    "value": 392,
    "day": "2017-07-20"
  },
  {
    "value": 154,
    "day": "2015-07-31"
  },
  {
    "value": 207,
    "day": "2017-05-26"
  },
  {
    "value": 296,
    "day": "2016-11-11"
  },
  {
    "value": 85,
    "day": "2017-05-29"
  },
  {
    "value": 267,
    "day": "2018-03-19"
  },
  {
    "value": 24,
    "day": "2017-07-08"
  },
  {
    "value": 173,
    "day": "2017-09-03"
  },
  {
    "value": 322,
    "day": "2016-12-04"
  },
  {
    "value": 242,
    "day": "2016-04-08"
  },
  {
    "value": 74,
    "day": "2017-09-05"
  },
  {
    "value": 395,
    "day": "2018-03-04"
  },
  {
    "value": 294,
    "day": "2016-03-04"
  },
  {
    "value": 51,
    "day": "2018-01-24"
  },
  {
    "value": 279,
    "day": "2015-11-18"
  },
  {
    "value": 209,
    "day": "2016-05-06"
  },
  {
    "value": 266,
    "day": "2017-03-11"
  },
  {
    "value": 11,
    "day": "2017-06-01"
  },
  {
    "value": 86,
    "day": "2018-01-05"
  },
  {
    "value": 325,
    "day": "2017-03-12"
  },
  {
    "value": 200,
    "day": "2017-05-16"
  },
  {
    "value": 309,
    "day": "2016-08-19"
  },
  {
    "value": 113,
    "day": "2017-03-02"
  },
  {
    "value": 232,
    "day": "2018-05-10"
  },
  {
    "value": 304,
    "day": "2018-05-05"
  },
  {
    "value": 207,
    "day": "2016-10-24"
  },
  {
    "value": 135,
    "day": "2018-05-01"
  },
  {
    "value": 79,
    "day": "2016-08-27"
  },
  {
    "value": 211,
    "day": "2018-02-15"
  },
  {
    "value": 85,
    "day": "2017-07-19"
  },
  {
    "value": 336,
    "day": "2017-04-21"
  },
  {
    "value": 397,
    "day": "2017-06-11"
  },
  {
    "value": 32,
    "day": "2017-03-22"
  },
  {
    "value": 317,
    "day": "2017-05-08"
  },
  {
    "value": 388,
    "day": "2017-05-23"
  },
  {
    "value": 188,
    "day": "2017-03-07"
  },
  {
    "value": 337,
    "day": "2016-02-14"
  },
  {
    "value": 396,
    "day": "2016-04-10"
  },
  {
    "value": 274,
    "day": "2015-10-30"
  },
  {
    "value": 257,
    "day": "2018-06-23"
  },
  {
    "value": 308,
    "day": "2016-09-09"
  },
  {
    "value": 96,
    "day": "2018-04-12"
  },
  {
    "value": 229,
    "day": "2016-02-25"
  },
  {
    "value": 161,
    "day": "2016-01-27"
  },
  {
    "value": 31,
    "day": "2016-01-30"
  },
  {
    "value": 19,
    "day": "2017-01-26"
  },
  {
    "value": 342,
    "day": "2016-07-24"
  },
  {
    "value": 293,
    "day": "2017-07-01"
  },
  {
    "value": 363,
    "day": "2016-08-20"
  },
  {
    "value": 283,
    "day": "2018-08-10"
  },
  {
    "value": 296,
    "day": "2018-01-10"
  },
  {
    "value": 14,
    "day": "2016-05-17"
  },
  {
    "value": 178,
    "day": "2018-04-05"
  },
  {
    "value": 289,
    "day": "2015-11-13"
  },
  {
    "value": 99,
    "day": "2016-10-09"
  },
  {
    "value": 219,
    "day": "2015-05-18"
  },
  {
    "value": 317,
    "day": "2016-04-04"
  },
  {
    "value": 93,
    "day": "2017-05-03"
  },
  {
    "value": 332,
    "day": "2017-08-16"
  },
  {
    "value": 120,
    "day": "2016-04-13"
  },
  {
    "value": 106,
    "day": "2018-06-17"
  },
  {
    "value": 33,
    "day": "2017-03-01"
  },
  {
    "value": 363,
    "day": "2015-08-26"
  },
  {
    "value": 382,
    "day": "2016-04-14"
  },
  {
    "value": 326,
    "day": "2015-07-22"
  },
  {
    "value": 142,
    "day": "2018-06-30"
  },
  {
    "value": 353,
    "day": "2017-10-15"
  },
  {
    "value": 297,
    "day": "2015-08-22"
  },
  {
    "value": 197,
    "day": "2016-11-04"
  },
  {
    "value": 361,
    "day": "2016-02-16"
  },
  {
    "value": 341,
    "day": "2017-06-12"
  },
  {
    "value": 207,
    "day": "2016-05-04"
  },
  {
    "value": 309,
    "day": "2018-05-23"
  },
  {
    "value": 277,
    "day": "2015-07-07"
  },
  {
    "value": 230,
    "day": "2016-09-18"
  },
  {
    "value": 143,
    "day": "2016-06-01"
  },
  {
    "value": 277,
    "day": "2015-12-12"
  },
  {
    "value": 141,
    "day": "2017-07-11"
  },
  {
    "value": 103,
    "day": "2018-08-01"
  },
  {
    "value": 263,
    "day": "2016-06-06"
  },
  {
    "value": 239,
    "day": "2015-12-11"
  },
  {
    "value": 131,
    "day": "2015-04-10"
  },
  {
    "value": 328,
    "day": "2015-06-05"
  },
  {
    "value": 380,
    "day": "2016-11-06"
  },
  {
    "value": 9,
    "day": "2015-09-24"
  },
  {
    "value": 385,
    "day": "2016-08-05"
  },
  {
    "value": 383,
    "day": "2016-08-04"
  },
  {
    "value": 95,
    "day": "2017-12-05"
  },
  {
    "value": 193,
    "day": "2016-07-16"
  },
  {
    "value": 334,
    "day": "2015-12-22"
  },
  {
    "value": 17,
    "day": "2016-07-01"
  },
  {
    "value": 149,
    "day": "2017-12-14"
  },
  {
    "value": 210,
    "day": "2018-01-01"
  },
  {
    "value": 101,
    "day": "2016-03-05"
  },
  {
    "value": 99,
    "day": "2016-12-23"
  },
  {
    "value": 227,
    "day": "2015-07-23"
  },
  {
    "value": 225,
    "day": "2015-07-27"
  },
  {
    "value": 250,
    "day": "2017-11-30"
  },
  {
    "value": 216,
    "day": "2016-04-12"
  },
  {
    "value": 352,
    "day": "2017-03-10"
  },
  {
    "value": 281,
    "day": "2017-11-22"
  },
  {
    "value": 220,
    "day": "2015-11-22"
  },
  {
    "value": 248,
    "day": "2016-06-30"
  },
  {
    "value": 104,
    "day": "2016-05-16"
  },
  {
    "value": 399,
    "day": "2015-08-21"
  },
  {
    "value": 273,
    "day": "2015-12-02"
  },
  {
    "value": 265,
    "day": "2018-06-05"
  },
  {
    "value": 140,
    "day": "2018-06-27"
  },
  {
    "value": 137,
    "day": "2017-10-01"
  },
  {
    "value": 397,
    "day": "2015-06-17"
  },
  {
    "value": 122,
    "day": "2015-04-15"
  },
  {
    "value": 67,
    "day": "2018-01-02"
  },
  {
    "value": 172,
    "day": "2015-11-11"
  },
  {
    "value": 88,
    "day": "2016-07-17"
  },
  {
    "value": 151,
    "day": "2016-03-18"
  },
  {
    "value": 393,
    "day": "2016-05-27"
  },
  {
    "value": 336,
    "day": "2017-09-18"
  },
  {
    "value": 304,
    "day": "2017-08-18"
  },
  {
    "value": 82,
    "day": "2018-05-26"
  },
  {
    "value": 162,
    "day": "2017-08-28"
  },
  {
    "value": 174,
    "day": "2015-11-05"
  },
  {
    "value": 154,
    "day": "2015-04-01"
  },
  {
    "value": 121,
    "day": "2017-10-27"
  },
  {
    "value": 124,
    "day": "2017-11-04"
  },
  {
    "value": 223,
    "day": "2017-12-02"
  },
  {
    "value": 232,
    "day": "2017-10-04"
  },
  {
    "value": 195,
    "day": "2015-09-03"
  },
  {
    "value": 196,
    "day": "2015-07-14"
  },
  {
    "value": 326,
    "day": "2018-06-03"
  },
  {
    "value": 105,
    "day": "2018-01-13"
  },
  {
    "value": 32,
    "day": "2015-11-03"
  },
  {
    "value": 131,
    "day": "2018-05-16"
  },
  {
    "value": 145,
    "day": "2015-06-21"
  },
  {
    "value": 127,
    "day": "2016-12-25"
  },
  {
    "value": 132,
    "day": "2016-01-28"
  },
  {
    "value": 58,
    "day": "2017-07-22"
  },
  {
    "value": 345,
    "day": "2017-09-12"
  },
  {
    "value": 56,
    "day": "2015-11-20"
  },
  {
    "value": 396,
    "day": "2016-11-22"
  },
  {
    "value": 93,
    "day": "2016-11-18"
  },
  {
    "value": 105,
    "day": "2017-04-26"
  },
  {
    "value": 132,
    "day": "2016-02-07"
  },
  {
    "value": 143,
    "day": "2018-04-22"
  },
  {
    "value": 203,
    "day": "2016-02-04"
  },
  {
    "value": 128,
    "day": "2015-12-16"
  },
  {
    "value": 176,
    "day": "2018-02-21"
  },
  {
    "value": 300,
    "day": "2015-04-21"
  },
  {
    "value": 316,
    "day": "2015-11-30"
  },
  {
    "value": 25,
    "day": "2016-12-19"
  },
  {
    "value": 246,
    "day": "2018-03-01"
  },
  {
    "value": 357,
    "day": "2015-11-28"
  },
  {
    "value": 306,
    "day": "2017-10-11"
  },
  {
    "value": 396,
    "day": "2015-11-15"
  },
  {
    "value": 132,
    "day": "2017-01-20"
  },
  {
    "value": 323,
    "day": "2016-12-29"
  },
  {
    "value": 97,
    "day": "2015-04-24"
  },
  {
    "value": 370,
    "day": "2017-01-28"
  },
  {
    "value": 157,
    "day": "2017-03-31"
  },
  {
    "value": 55,
    "day": "2015-07-20"
  },
  {
    "value": 47,
    "day": "2017-10-08"
  },
  {
    "value": 224,
    "day": "2015-10-27"
  },
  {
    "value": 158,
    "day": "2018-06-18"
  },
  {
    "value": 360,
    "day": "2018-05-21"
  },
  {
    "value": 84,
    "day": "2017-08-01"
  },
  {
    "value": 342,
    "day": "2018-02-03"
  },
  {
    "value": 65,
    "day": "2017-12-03"
  },
  {
    "value": 188,
    "day": "2015-10-18"
  },
  {
    "value": 247,
    "day": "2017-05-06"
  },
  {
    "value": 379,
    "day": "2015-10-02"
  },
  {
    "value": 180,
    "day": "2015-10-09"
  },
  {
    "value": 197,
    "day": "2016-03-20"
  },
  {
    "value": 247,
    "day": "2015-12-07"
  },
  {
    "value": 384,
    "day": "2015-12-06"
  },
  {
    "value": 267,
    "day": "2016-01-17"
  },
  {
    "value": 349,
    "day": "2018-04-27"
  },
  {
    "value": 45,
    "day": "2017-06-04"
  },
  {
    "value": 231,
    "day": "2016-11-21"
  },
  {
    "value": 3,
    "day": "2015-07-06"
  },
  {
    "value": 168,
    "day": "2016-08-13"
  },
  {
    "value": 345,
    "day": "2017-01-23"
  },
  {
    "value": 13,
    "day": "2015-06-11"
  },
  {
    "value": 258,
    "day": "2015-10-16"
  },
  {
    "value": 289,
    "day": "2016-07-13"
  },
  {
    "value": 65,
    "day": "2016-07-18"
  },
  {
    "value": 133,
    "day": "2015-08-13"
  },
  {
    "value": 35,
    "day": "2017-05-11"
  },
  {
    "value": 335,
    "day": "2016-01-07"
  },
  {
    "value": 75,
    "day": "2017-02-15"
  },
  {
    "value": 388,
    "day": "2017-08-06"
  },
  {
    "value": 243,
    "day": "2016-03-22"
  },
  {
    "value": 88,
    "day": "2017-09-20"
  },
  {
    "value": 28,
    "day": "2015-04-04"
  },
  {
    "value": 187,
    "day": "2017-03-14"
  },
  {
    "value": 386,
    "day": "2017-11-16"
  },
  {
    "value": 20,
    "day": "2017-03-17"
  },
  {
    "value": 181,
    "day": "2016-08-21"
  },
  {
    "value": 241,
    "day": "2015-10-14"
  },
  {
    "value": 11,
    "day": "2015-10-24"
  },
  {
    "value": 118,
    "day": "2017-11-07"
  },
  {
    "value": 210,
    "day": "2016-02-23"
  },
  {
    "value": 371,
    "day": "2016-03-19"
  },
  {
    "value": 225,
    "day": "2018-07-27"
  },
  {
    "value": 166,
    "day": "2017-08-08"
  },
  {
    "value": 351,
    "day": "2017-09-16"
  },
  {
    "value": 388,
    "day": "2018-03-18"
  },
  {
    "value": 116,
    "day": "2016-12-21"
  },
  {
    "value": 262,
    "day": "2016-08-18"
  },
  {
    "value": 290,
    "day": "2017-09-28"
  },
  {
    "value": 339,
    "day": "2017-08-20"
  }
]