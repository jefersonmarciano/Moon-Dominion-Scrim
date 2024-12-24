import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { readExcelFile } from '../../utils/excelReader';
import DataTable from '../../components/DataTable';
import { useExcel } from '../../context/ExcelContext';
import { Bar } from 'react-chartjs-2';
import { chartColors } from '../../styles/globalStyles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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
`;

const Defensive = () => {
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
    { key: 'damageTaken', label: 'Dano Recebido' },
    { key: 'deaths', label: 'Mortes' },
    { key: 'survivalRate', label: 'Taxa de Sobrevivência' },
  ];

  const getMostTanky = () => {
    if (!data.length) return null;
    return data.reduce((prev, current) => 
      (prev.damageTaken > current.damageTaken) ? prev : current
    );
  };

  const getChartData = () => {
    const topPlayers = data
      .sort((a, b) => b.damageTaken - a.damageTaken)
      .slice(0, 5);

    return {
      labels: topPlayers.map(player => player.player),
      datasets: [
        {
          label: 'Dano Recebido',
          data: topPlayers.map(player => player.damageTaken),
          backgroundColor: chartColors.primary,
          borderColor: chartColors.borders,
          borderWidth: 2
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: chartColors.text,
          font: {
            family: 'MedievalSharp'
          }
        }
      },
      title: {
        display: true,
        text: 'Top 5 - Dano Recebido',
        color: chartColors.text,
        font: {
          family: 'MedievalSharp',
          size: 16
        }
      }
    },
    scales: {
      y: {
        ticks: { 
          color: chartColors.text,
          font: {
            family: 'MedievalSharp'
          }
        },
        grid: { color: chartColors.grid }
      },
      x: {
        ticks: { 
          color: chartColors.text,
          font: {
            family: 'MedievalSharp'
          }
        },
        grid: { color: chartColors.grid }
      }
    }
  };

  return (
    <div>
      <h2>Dados Defensivos</h2>
      
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
              <h3>Mais Tanque</h3>
              <p>{getMostTanky()?.player}</p>
              <p>Dano Recebido: {getMostTanky()?.damageTaken}</p>
            </StatCard>
          </StatsContainer>

          <ChartContainer>
            <Bar data={getChartData()} options={chartOptions} />
          </ChartContainer>

          <DataTable data={data} columns={columns} />
        </>
      )}
    </div>
  );
};

export default Defensive;