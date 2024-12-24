import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.8rem 1.2rem;
  background: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  font-family: 'MedievalSharp', cursive;
  cursor: pointer;
  
  &:hover {
    background: var(--highlight-color);
  }

  option {
    background: var(--secondary-color);
  }
`;

const FilterLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text-color);
`;

const Filters = ({ data, onFilterChange }) => {
  const guilds = [...new Set(data.map(item => item.guild))].filter(Boolean);

  return (
    <FilterContainer>
      <FilterLabel>
        Guild
        <Select 
          onChange={(e) => onFilterChange('guild', e.target.value)}
          defaultValue=""
        >
          <option value="">Todas as Guilds</option>
          {guilds.map(guild => (
            <option key={guild} value={guild}>{guild.toUpperCase()}</option>
          ))}
        </Select>
      </FilterLabel>
    </FilterContainer>
  );
};

export default Filters;