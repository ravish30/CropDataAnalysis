import React, { useState, useEffect } from 'react';
import { Table } from '@mantine/core';
import { CropData, YearlyData } from '../interfaces/interface';
const cropData: CropData[] = require('../data/data.json')

const YearlyAnalysis = () => {
    const [data, setData] = useState<YearlyData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const groupedByYear: { [year: string]: CropData[] } = cropData.reduce((acc: any, current: CropData) => {
                const year: string = current.Year;
                if (!acc[year]) {
                  acc[year] = [];
                }
                acc[year].push(current);
                return acc;
              }, {});

              const cropWithMaxAndMinProductionByYear: YearlyData[] = [];
              for (const year in groupedByYear) {
                const crops = groupedByYear[year];
                let cropWithMaxProduction: string = '';
                let cropWithMinProduction: string = '';
                let maxProduction: number | null = null;
                let minProduction: number | null = null;
                for (const crop of crops) {
                  const production = typeof crop['Crop Production (UOM:t(Tonnes))'] === 'number'
                    ? crop['Crop Production (UOM:t(Tonnes))'] as number
                    : 0;
                  if (maxProduction === null || production > maxProduction) {
                    maxProduction = production;
                    cropWithMaxProduction = crop["Crop Name"];
                  }
                  if (minProduction === null || production < minProduction) {
                    minProduction = production;
                    cropWithMinProduction = crop["Crop Name"];
                  }
                }
                cropWithMaxAndMinProductionByYear.push({
                    year: year.split(', ')[1],
                    maxProducedCrop: cropWithMaxProduction,
                    minProducedCrop: cropWithMinProduction
                })
              }
              setData(cropWithMaxAndMinProductionByYear);
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
            <Table.Th>Crop With Maximum Production in That Year</Table.Th>
            <Table.Th>Crop With Minimum Production in That Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item: YearlyData, index: number) => (
            <Table.Tr key={index}>
              <Table.Td>{item.year}</Table.Td>
              <Table.Td>{item.maxProducedCrop}</Table.Td>
              <Table.Td>{item.minProducedCrop}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
  );
};

export default YearlyAnalysis;
