import { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(44, 24, 16, 0.9);
  border: 2px solid var(--text-color);
  margin: 1rem 0;
`;

const Th = styled.th`
  padding: 1rem;
  color: var(--text-color);
  border: 1px solid var(--text-color);
  text-align: left;
  cursor: pointer;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
  }
`;

const Td = styled.td`
  padding: 0.8rem;
  border: 1px solid var(--text-color);
  color: #fff;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: rgba(139, 69, 19, 0.3);
  }
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
  }
`;

const ExportButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  cursor: pointer;
  
  &:hover {
    background: var(--primary-color);
  }
`;

const DataTable = ({ data }) => {
  const columns = [
    { key: 'player', label: 'Player' },
    { key: 'guild', label: 'Guild' },
    { key: 'kills', label: 'Kills' },
    { key: 'assists', label: 'Assists' },
    { key: 'dmgDealt', label: 'DMG DEALT' },
    { key: 'damageTaken', label: 'DAMAGE TAKEN' },
    { key: 'healing', label: 'AMOUT HEALER' },
    { key: 'damageHealRatio', label: 'Proporção Dano/Cura' },
    { key: 'damageToKill', label: 'Dano para Matar' }
  ];

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <Th key={column.key}>{column.label}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map((column) => (
              <Td key={`${index}-${column.key}`}>{row[column.key]}</Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;