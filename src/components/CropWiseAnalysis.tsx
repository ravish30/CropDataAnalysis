import React, { useState, useEffect } from 'react';
import { Table } from '@mantine/core';
import { CropData, CropWiseData } from '../interfaces/interface';
const cropData: CropData[] = require('../data/data.json')

const YearlyAnalysis = () => {
    const [data, setData] = useState<CropWiseData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const groupedByCropName: { [cropName: string]: CropData[] } = cropData.reduce((acc: any, current: CropData) => {
                const cropName = current['Crop Name'];
                if (!acc[cropName]) {
                  acc[cropName] = [];
                }
                acc[cropName].push(current);
                return acc;
              }, {});

              const cropWithAvgYieldAndCultivation: CropWiseData[] = [];
              for (const cropName in groupedByCropName) {
                const crops = groupedByCropName[cropName];
                let totalYield: number = 0;
                let totalCultivationArea: number = 0;
                for (const crop of crops) {
                  const cropYield = typeof crop["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] === 'number'
                    ? crop["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] as number
                    : 0;
                  const cultivationArea = typeof crop["Area Under Cultivation (UOM:Ha(Hectares))"] === 'number'
                    ? crop["Area Under Cultivation (UOM:Ha(Hectares))"] as number
                    : 0;
                   totalYield += cropYield
                   totalCultivationArea += cultivationArea
                
                }
                cropWithAvgYieldAndCultivation.push({
                    cropName: cropName,
                    avgYield: (totalYield / crops.length).toFixed(3),
                    avgCultivation: (totalCultivationArea / crops.length).toFixed(3)
                })
              }
              setData(cropWithAvgYieldAndCultivation);
            } catch (error) {
              console.error('Error loading JSON data:', error);
            }
          };
      
          fetchData();
    }, [])
  return (
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
            <Table.Th>Average Cultivation Area of the Crop between 1950-2020</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item: CropWiseData, index: number) => (
            <Table.Tr key={index}>
              <Table.Td>{item.cropName}</Table.Td>
              <Table.Td>{item.avgYield}</Table.Td>
              <Table.Td>{item.avgCultivation}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
  );
};

export default YearlyAnalysis;
