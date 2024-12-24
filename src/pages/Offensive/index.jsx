import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { readExcelFile } from '../../utils/excelReader';
import DataTable from '../../components/DataTable';
import { useExcel } from '../../context/ExcelContext';

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

const Offensive = () => {
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
    { key: 'kills', label: 'Kills' },
    { key: 'assists', label: 'Assistências' },
    { key: 'dmgDealt', label: 'Dano Causado' },
  ];

  const getTopKiller = () => {
    if (!data.length) return null;
    return data.reduce((prev, current) => 
      (prev.kills > current.kills) ? prev : current
    );
  };

  return (
    <div>
      <h2>Dados Ofensivos</h2>
      
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
              <h3>Top Killer</h3>
              <p>{getTopKiller()?.player}</p>
              <p>Kills: {getTopKiller()?.kills}</p>
            </StatCard>
          </StatsContainer>

          <DataTable data={data} columns={columns} />
        </>
      )}
    </div>
  );
};

export default Offensive;