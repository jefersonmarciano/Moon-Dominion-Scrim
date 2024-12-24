import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { readExcelFile } from '../../utils/excelReader';
import DataTable from '../../components/DataTable';
import { useExcel } from '../../context/ExcelContext';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { chartColors } from '../../styles/globalStyles';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--secondary-color);
  color: var(--text-color);
  border: 2px solid var(--text-color);
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background: var(--primary-color);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(44, 24, 16, 0.9);
  padding: 1.5rem;
  border: 2px solid var(--text-color);
  border-radius: 8px;
`;

const ChartContainer = styled.div`
  background: rgba(44, 24, 16, 0.9);
  padding: 1.5rem;
  border: 2px solid var(--text-color);
  border-radius: 8px;
  margin-bottom: 2rem;
  max-width: 500px;
  margin: 0 auto 2rem auto;
`;

const Healing = () => {
  const { excelData, updateExcelData } = useExcel();
  const [data, setData] = useState(excelData);

  useEffect(() => {
    setData(excelData);
  }, [excelData]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const jsonData = await readExcelFile(file);
        updateExcelData(jsonData);
      } catch (error) {
        console.error('Erro ao ler arquivo:', error);
      }
    }
  };

  const columns = [
    { key: 'player', label: 'Player' },
    { key: 'guild', label: 'Guild' },
    { key: 'healing', label: 'Cura Total' },
    { key: 'healingEfficiency', label: 'Eficiência de Cura' },
    { key: 'overhealing', label: 'Sobrecura' },
  ];

  const getTopHealer = () => {
    if (!data.length) return null;
    return data.reduce((prev, current) => 
      (prev.healing > current.healing) ? prev : current
    );
  };

  const getChartData = () => {
    const topHealers = data
      .sort((a, b) => b.healing - a.healing)
      .slice(0, 5);

    return {
      labels: topHealers.map(player => player.player),
      datasets: [
        {
          data: topHealers.map(player => player.healing),
          backgroundColor: chartColors.primary,
          borderColor: chartColors.borders,
          borderWidth: 2,
          hoverBackgroundColor: chartColors.secondary
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: chartColors.text,
          font: {
            family: 'MedievalSharp'
          }
        }
      },
      title: {
        display: true,
        text: 'Distribuição de Cura - Top 5',
        color: chartColors.text,
        font: {
          family: 'MedievalSharp',
          size: 16
        }
      }
    }
  };

  return (
    <div>
      <h2>Dados de Cura</h2>
      
      {!excelData.length && (
        <UploadButton>
          Carregar Excel
          <FileInput 
            type="file" 
            accept=".xlsx,.xls" 
            onChange={handleFileUpload}
          />
        </UploadButton>
      )}

      {data.length > 0 && (
        <>
          <StatsContainer>
            <StatCard>
              <h3>Melhor Healer</h3>
              <p>{getTopHealer()?.player}</p>
              <p>Cura Total: {getTopHealer()?.healing}</p>
            </StatCard>
          </StatsContainer>

          <ChartContainer>
            <Doughnut data={getChartData()} options={chartOptions} />
          </ChartContainer>

          <DataTable data={data} columns={columns} />
        </>
      )}
    </div>
  );
};

export default Healing;