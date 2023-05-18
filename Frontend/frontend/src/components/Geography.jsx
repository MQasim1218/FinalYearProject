import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
import { useAllDonorsDonationsQuery } from "../app/redux-features/donations/DonorDonations/DonorDonsSlice";

const Geography = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let { data: donsFromDonors, isLoading: isDonsLoading, error: donsError, isError: isDonsError, isSuccess: IsDonsSuccess } = useAllDonorsDonationsQuery()

  console.log("Donations by all donors: ", donsFromDonors)

  const totalAmountByLocation = donsFromDonors?.reduce((acc, cur) => {
    // Get the location of the current donor
    const location = cur.donor?.location;

    // Check if the location exists in the accumulator object
    if (acc.hasOwnProperty(location)) {
      // If it does, add the current donation amount to the total amount for that location
      acc[location] += cur.amount;
    } else {
      // If it doesn't, initialize the total amount for that location to the current donation amount
      acc[location] = cur.amount;
    }
    return acc;
  }, {});

  // Print the total amount for each location
  console.log("Result: ",totalAmountByLocation);


  const mockGeographyData = [
    {
      id: "AFG",
      value: totalAmountByLocation?.Afghanistan || 0,
    },
    {
      id: "AGO",
      value: totalAmountByLocation?.Angola || 0,
    },
    {
      id: "ALB",
      value: totalAmountByLocation?.Albania || 0,
    },
    {
      id: "ARE",
      value: totalAmountByLocation?.UnitedArabEmirates || 0,
    },
    {
      id: "ARG",
      value: totalAmountByLocation?.Argentina || 0,
    },
    {
      id: "ARM",
      value: totalAmountByLocation?.Armenia || 0,
    },
    {
      id: "ATA",
      value: totalAmountByLocation?.Antarctica || 0,
    },
    {
      id: "ATF",
      value: totalAmountByLocation?.FrenchSouthernandAntarcticLands || 0,
    },
    {
      id: "AUT",
      value: totalAmountByLocation?.Austria || 0,
    },
    {
      id: "AUS",
      value: totalAmountByLocation?.Australia || 0,
    },
    {
      id: "AZE",
      value: totalAmountByLocation?.Azerbaijan || 0,
    },
    {
      id: "BDI",
      value: totalAmountByLocation?.Burundi || 0,
    },
    {
      id: "BEL",
      value: totalAmountByLocation?.Belgium || 0,
    },
    {
      id: "BEN",
      value: totalAmountByLocation?.Benin || 0, 
    },
    {
      id: "BFA",
      value: totalAmountByLocation?.BurkinaFaso || 0,
    },
    {
      id: "BGD",
      value: totalAmountByLocation?.Bangladesh || 0,
    },
    {
      id: "BGR",
      value: totalAmountByLocation?.Bulgaria || 0,
    },
    {
      id: "BHS",
      value: totalAmountByLocation?.TheBahamas || 0,
    },
    {
      id: "BIH",
      value: totalAmountByLocation?.BosniaandHerzegovina || 0,
    },
    {
      id: "BLR",
      value: totalAmountByLocation?.Belarus || 0,
    },
    {
      id: "BLZ",
      value: totalAmountByLocation?.Belize || 0,
    },
    {
      id: "BOL",
      value: totalAmountByLocation?.Bolivia || 0,
    },
    {
      id: "BRN",
      value: totalAmountByLocation?.BruneiDarussalam || 0,
    },
    {
      id: "BTN",
      value: totalAmountByLocation?.Bhutan || 0,
    },
    {
      id: "BWA",
      value: totalAmountByLocation?.Botswana || 0,
    },
    {
      id: "CAF",
      value: totalAmountByLocation?.CentralAfricanRepublic || 0,
    },
    {
      id: "CAN",
      value: totalAmountByLocation?.Canada || 0,
    },
    {
      id: "CHE",
      value: totalAmountByLocation?.Switzerland || 0,
    },
    {
      id: "CHL",
      value: totalAmountByLocation?.Chile || 0,
    },
    {
      id: "CHN",
      value: totalAmountByLocation?.China || 0,
    },
    {
      id: "CIV",
      value: totalAmountByLocation?.IvoryCoast || 0,
    },
    {
      id: "CMR",
      value: totalAmountByLocation?.Cameroon || 0,
    },
    {
      id: "COG",
      value: totalAmountByLocation?.RepublicoftheCongo || 0,
    },
    {
      id: "COL",
      value: totalAmountByLocation?.Colombia || 0,
    },
    {
      id: "CRI",
      value: totalAmountByLocation?.CostaRica || 0,
    },
    {
      id: "CUB",
      value: totalAmountByLocation?.Cuba || 0,
    },
    {
      id: "CYP",
      value: totalAmountByLocation?.Cyprus || 0,
    },
    {
      id: "CZE",
      value: totalAmountByLocation?.CzechRepublic || 0,
    },
    {
      id: "DEU",
      value: totalAmountByLocation?.Germany || 0,
    },
    {
      id: "DJI",
      value: totalAmountByLocation?.Djibouti || 0,
    },
    {
      id: "DNK",
      value: totalAmountByLocation?.Denmark || 0,
    },
    {
      id: "DOM",
      value: totalAmountByLocation?.DominicanRepublic || 0,
    },
    {
      id: "DZA",
      value: totalAmountByLocation?.Algeria || 0,
    },
    {
      id: "ECU",
      value: totalAmountByLocation?.Ecuador || 0,
    },
    {
      id: "EGY",
      value: totalAmountByLocation?.Egypt || 0,
    },
    {
      id: "ERI",
      value: totalAmountByLocation?.Eritrea || 0,
    },
    {
      id: "ESP",
      value: totalAmountByLocation?.Spain || 0,
    },
    {
      id: "EST",
      value: totalAmountByLocation?.Estonia || 0,
    },
    {
      id: "ETH",
      value: totalAmountByLocation?.Ethiopia || 0,
    },
    {
      id: "FIN",
      value: totalAmountByLocation?.Finland || 0,
    },
    {
      id: "FJI",
      value: totalAmountByLocation?.Fiji || 0,
    },
    {
      id: "FLK",
      value: totalAmountByLocation?.FalklandIslands || 0,
    },
    {
      id: "FRA",
      value: totalAmountByLocation?.France || 0,
    },
    {
      id: "GAB",
      value: totalAmountByLocation?.Gabon || 0,
    },
    {
      id: "GBR",
      value: totalAmountByLocation?.UnitedKingdom || 0,
    },
    {
      id: "GEO",
      value: totalAmountByLocation?.Georgia || 0,
    },
    {
      id: "GHA",
      value: totalAmountByLocation?.Ghana || 0,
    },
    {
      id: "GIN",
      value: totalAmountByLocation?.Guinea || 0,
    },
    {
      id: "GMB",
      value: totalAmountByLocation?.Gambia || 0,
    },
    {
      id: "GNB",
      value: totalAmountByLocation?.GuineaBissau || 0,
    },
    {
      id: "GNQ",
      value: totalAmountByLocation?.EquatorialGuinea || 0,
    },
    {
      id: "GRC",
      value: totalAmountByLocation?.Greece || 0,
    },
    {
      id: "GTM",
      value: totalAmountByLocation?.Guatemala || 0,
    },
    {
      id: "GUY",
      value: totalAmountByLocation?.Guyana || 0,
    },
    {
      id: "HND",
      value: totalAmountByLocation?.Honduras || 0,
    },
    {
      id: "HRV",
      value: totalAmountByLocation?.Croatia || 0,
    },
    {
      id: "HTI",
      value: totalAmountByLocation?.Haiti || 0,
    },
    {
      id: "HUN",
      value: totalAmountByLocation?.Hungary || 0,
    },
    {
      id: "IDN",
      value: totalAmountByLocation?.Indonesia || 0,
    },
    {
      id: "IND",
      value: totalAmountByLocation?.India || 0,
    },
    {
      id: "IRL",
      value: totalAmountByLocation?.Ireland || 0,
    },
    {
      id: "IRN",
      value: totalAmountByLocation?.Iran || 0,
    },
    {
      id: "IRQ",
      value: totalAmountByLocation?.Iraq || 0,
    },
    {
      id: "ISL",
      value: totalAmountByLocation?.Iceland || 0,
    },
    {
      id: "ISR",
      value: totalAmountByLocation?.Israel || 0,
    },
    {
      id: "ITA",
      value: totalAmountByLocation?.Italy || 0,
    },
    {
      id: "JAM",
      value: totalAmountByLocation?.Jamaica || 0,
    },
    {
      id: "JOR",
      value: totalAmountByLocation?.Jordan || 0,
    },
    {
      id: "JPN",
      value: totalAmountByLocation?.Japan || 0,
    },
    {
      id: "KAZ",
      value: totalAmountByLocation?.Kazakhstan || 0,
    },
    {
      id: "KEN",
      value: totalAmountByLocation?.Kenya || 0,
    },
    {
      id: "KGZ",
      value: totalAmountByLocation?.Kyrgyzstan || 0,
    },
    {
      id: "KHM",
      value: totalAmountByLocation?.Cambodia || 0,
    },
    {
      id: "OSA",
      value: totalAmountByLocation?.Kosovo || 0,
    },
    {
      id: "KWT",
      value: totalAmountByLocation?.Kuwait || 0,
    },
    {
      id: "LAO",
      value: totalAmountByLocation?.Laos || 0,
    },
    {
      id: "LBN",
      value: totalAmountByLocation?.Lebanon || 0,
    },
    {
      id: "LBR",
      value: totalAmountByLocation?.Liberia || 0,
    },
    {
      id: "LBY",
      value: totalAmountByLocation?.Libya || 0,
    },
    {
      id: "LKA",
      value: totalAmountByLocation?.SriLanka || 0,
    },
    {
      id: "LSO",
      value: totalAmountByLocation?.Lesotho || 0,
    },
    {
      id: "LTU",
      value: totalAmountByLocation?.Lithuania || 0, 
    },
    {
      id: "LUX",
      value: totalAmountByLocation?.Luxembourg || 0,
    },
    {
      id: "LVA",
      value: totalAmountByLocation?.Latvia || 0,
    },
    {
      id: "MAR",
      value: totalAmountByLocation?.Morocco || 0,
    },
    {
      id: "MDA",
      value: totalAmountByLocation?.Moldova || 0,
    },
    {
      id: "MDG",
      value: totalAmountByLocation?.Madagascar || 0,
    },
    {
      id: "MEX",
      value: totalAmountByLocation?.Mexico || 0,
    },
    {
      id: "MKD",
      value: totalAmountByLocation?.Macedonia || 0,
    },
    {
      id: "MLI",
      value: totalAmountByLocation?.Mali || 0,
    },
    {
      id: "MMR",
      value: totalAmountByLocation?.Myanmar || 0,
    },
    {
      id: "MNE",
      value: totalAmountByLocation?.Montenegro || 0,
    },
    {
      id: "MNG",
      value: totalAmountByLocation?.Mongolia || 0,
    },
    {
      id: "MOZ",
      value: totalAmountByLocation?.Mozambique || 0,
    },
    {
      id: "MRT",
      value: totalAmountByLocation?.Mauritania || 0,
    },
    {
      id: "MWI",
      value: totalAmountByLocation?.Malawi || 0,
    },
    {
      id: "MYS",
      value: totalAmountByLocation?.Malaysia || 0,
    },
    {
      id: "NAM",
      value: totalAmountByLocation?.Namibia || 0,
    },
    {
      id: "NCL",
      value: totalAmountByLocation?.NewCaledonia || 0,
    },
    {
      id: "NER",
      value: totalAmountByLocation?.Niger || 0,
    },
    {
      id: "NGA",
      value: totalAmountByLocation?.Nigeria || 0,
    },
    {
      id: "NIC",
      value: totalAmountByLocation?.Nicaragua || 0,
    },
    {
      id: "NLD",
      value: totalAmountByLocation?.Netherlands || 0,
    },
    {
      id: "NOR",
      value: totalAmountByLocation?.Norway || 0,
    },
    {
      id: "NPL",
      value: totalAmountByLocation?.Nepal || 0,
    },
    {
      id: "NZL",
      value: totalAmountByLocation?.NewZealand || 0,
    },
    {
      id: "OMN",
      value: totalAmountByLocation?.Oman || 0,
    },
    {
      id: "PAK",
      value: totalAmountByLocation?.Pakistan || 0,
    },
    {
      id: "PAN",
      value: totalAmountByLocation?.Panama || 0,
    },
    {
      id: "PER",
      value: totalAmountByLocation?.Peru || 0,
    },
    {
      id: "PHL",
      value: totalAmountByLocation?.Philippines || 0,
    },
    {
      id: "PNG",
      value: totalAmountByLocation?.PapuaNewGuinea || 0,
    },
    {
      id: "POL",
      value: totalAmountByLocation?.Poland || 0,
    },
    {
      id: "PRI",
      value: totalAmountByLocation?.PuertoRico || 0,
    },
    {
      id: "PRT",
      value: totalAmountByLocation?.Portugal || 0,
    },
    {
      id: "PRY",
      value: totalAmountByLocation?.Paraguay || 0,
    },
    {
      id: "QAT",
      value: totalAmountByLocation?.Qatar || 0,
    },
    {
      id: "ROU",
      value: totalAmountByLocation?.Romania || 0,
    },
    {
      id: "RUS",
      value: totalAmountByLocation?.Russia || 0,
    },
    {
      id: "RWA",
      value: totalAmountByLocation?.Rwanda || 0,
    },
    {
      id: "ESH",
      value: totalAmountByLocation?.WesternSahara || 0,
    },
    {
      id: "SAU",
      value: totalAmountByLocation?.SaudiArabia || 0,
    },
    {
      id: "SDN",
      value: totalAmountByLocation?.Sudan || 0,
    },
    {
      id: "SDS",
      value: totalAmountByLocation?.SouthSudan || 0,
    },
    {
      id: "SEN",
      value: totalAmountByLocation?.Senegal || 0,
    },
    {
      id: "SLB",
      value: totalAmountByLocation?.SolomonIslands || 0,
    },
    {
      id: "SLE",
      value: totalAmountByLocation?.SierraLeone || 0,
    },
    {
      id: "SLV",
      value: totalAmountByLocation?.ElSalvador || 0,
    },
    {
      id: "ABV",
      value: totalAmountByLocation?.Somaliland || 0,
    },
    {
      id: "SOM",
      value: totalAmountByLocation?.Somalia || 0,
    },
    {
      id: "SRB",
      value: totalAmountByLocation?.RepublicofSerbia || 0,
    },
    {
      id: "SUR",
      value: totalAmountByLocation?.Suriname || 0,
    },
    {
      id: "SVK",
      value: totalAmountByLocation?.Slovakia || 0,
    },
    {
      id: "SVN",
      value: totalAmountByLocation?.Slovenia || 0,
    },
    {
      id: "SWZ",
      value: totalAmountByLocation?.Swaziland || 0,
    },
    {
      id: "SYR",
      value: totalAmountByLocation?.Syria || 0,
    },
    {
      id: "TCD",
      value: totalAmountByLocation?.Chad || 0,
    },
    {
      id: "TGO",
      value: totalAmountByLocation?.Togo || 0,
    },
    {
      id: "THA",
      value: totalAmountByLocation?.Thailand || 0,
    },
    {
      id: "TJK",
      value: totalAmountByLocation?.Tajikistan || 0,
    },
    {
      id: "TKM",
      value: totalAmountByLocation?.Turkmenistan || 0,
    },
    {
      id: "TLS",
      value: totalAmountByLocation?.EastTimor || 0,
    },
    {
      id: "TTO",
      value: totalAmountByLocation?.TrinidadandTobago || 0,
    },
    {
      id: "TUN",
      value: totalAmountByLocation?.Tunisia || 0,
    },
    {
      id: "TUR",
      value: totalAmountByLocation?.Turkey || 0,
    },
    {
      id: "TWN",
      value: totalAmountByLocation?.Taiwan || 0,
    },
    {
      id: "TZA",
      value: totalAmountByLocation?.UnitedRepublicofTanzania || 0,
    },
    {
      id: "UGA",
      value: totalAmountByLocation?.Uganda || 0,
    },
    {
      id: "UKR",
      value: totalAmountByLocation?.Ukraine || 0,
    },
    {
      id: "URY",
      value: totalAmountByLocation?.Uruguay || 0,
    },
    {
      id: "USA",
      value: totalAmountByLocation?.UnitedStatesofAmerica || 0,
    },
    {
      id: "UZB",
      value: totalAmountByLocation?.Uzbekistan || 0,
    },
    {
      id: "VEN",
      value: totalAmountByLocation?.Venezuela || 0,
    },
    {
      id: "VNM",
      value: totalAmountByLocation?.Vietnam || 0,
    },
    {
      id: "VUT",
      value: totalAmountByLocation?.Vanuatu || 0,
    },
    {
      id: "PSE",
      value: totalAmountByLocation?.WestBank || 0,
    },
    {
      id: "YEM",
      value: totalAmountByLocation?.Yemen || 0,
    },
    {
      id: "ZAF",
      value: totalAmountByLocation?.SouthAfrica || 0,
    },
    {
      id: "ZMB",
      value: totalAmountByLocation?.Zambia || 0,
    },
    {
      id: "ZWE",
      value: totalAmountByLocation?.Zimbabwe || 0,
    },
    {
      id: "KOR",
      value: totalAmountByLocation?.SouthKorea || 0,
    },
    {
      id: "GRL",
      value: totalAmountByLocation?.Greenland || 0,
    },
    {
      id: "SWE",
      value: totalAmountByLocation?.Sweden || 0,
    },
    {
      id: "BRA",
      value: totalAmountByLocation?.Brazil || 0,
    },
    {
      id: "COD",
      value: totalAmountByLocation?.DemocraticRepublicofCongo || 0,
    },
  ];

  return (
    <ResponsiveChoropleth 
      data={mockGeographyData}
        theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
                container: {
                  color: colors.primary[500],
                },
              },
          }}
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[ 0, 1000000 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={isDashboard ? 40 : 150}
        projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
        projectionRotation={[ 0, 0, 0 ]}
        graticuleLineColor="#dddddd"
        borderWidth={1.5}
        borderColor="#ffffff"
        colors="PuBu"
        legends={ !isDashboard ? [ 
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: colors.blueAccent[500],
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]: undefined }
    />
    );
};

export default Geography;