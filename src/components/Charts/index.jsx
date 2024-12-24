import { Line, Bar, Radar, Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartContainer = styled.div`
  background: rgba(44, 24, 16, 0.9);
  padding: 1.5rem;
  border: 2px solid var(--text-color);
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Charts = ({ data }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#d4af37' }
      },
      title: { color: '#d4af37' }
    },
    scales: {
      y: {
        ticks: { color: '#d4af37' },
        grid: { color: 'rgba(212, 175, 55, 0.1)' }
      },
      x: {
        ticks: { color: '#d4af37' },
        grid: { color: 'rgba(212, 175, 55, 0.1)' }
      }
    }
  };

  const getKillsPerformanceData = () => ({
    labels: data.map(item => item.player).slice(0, 8),
    datasets: [{
      label: 'Kills',
      data: data.map(item => item.kills).slice(0, 8),
      borderColor: '#d4af37',
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      fill: true
    }]
  });

  const getDamageDistributionData = () => ({
    labels: ['Dano Causado', 'Dano Recebido', 'Cura'],
    datasets: data.slice(0, 5).map((player, index) => ({
      label: player.player,
      data: [player.dmgDealt, player.damageTaken, player.healing],
      backgroundColor: `rgba(212, 175, 55, ${0.8 - index * 0.1})`,
      borderColor: '#d4af37',
      borderWidth: 1
    }))
  });

  const getEfficiencyRadarData = () => ({
    labels: ['Kills', 'Assistências', 'Sobrevivência', 'Dano', 'Cura'],
    datasets: data.slice(0, 3).map((player, index) => ({
      label: player.player,
      data: [
        player.kills,
        player.assists,
        100 - (player.deaths * 10),
        player.dmgDealt / 1000,
        player.healing / 1000
      ],
      backgroundColor: `rgba(212, 175, 55, ${0.3 - index * 0.1})`,
      borderColor: `rgba(212, 175, 55, ${0.8 - index * 0.1})`,
      borderWidth: 2
    }))
  });

  const getGuildPerformanceData = () => {
    const guildStats = data.reduce((acc, player) => {
      if (!acc[player.guild]) {
        acc[player.guild] = { kills: 0, dmgDealt: 0 };
      }
      acc[player.guild].kills += player.kills;
      acc[player.guild].dmgDealt += player.dmgDealt;
      return acc;
    }, {});

    return {
      labels: Object.keys(guildStats),
      datasets: [{
        data: Object.values(guildStats).map(stats => stats.kills),
        backgroundColor: Object.keys(guildStats).map((_, i) => 
          `rgba(212, 175, 55, ${0.8 - i * 0.1})`
        )
      }]
    };
  };

  return (
    <ChartGrid>
      <ChartContainer>
        <h3>Performance de Kills</h3>
        <Line data={getKillsPerformanceData()} options={defaultOptions} />
      </ChartContainer>

      <ChartContainer>
        <h3>Distribuição de Dano</h3>
        <Bar data={getDamageDistributionData()} options={defaultOptions} />
      </ChartContainer>

      <ChartContainer>
        <h3>Eficiência dos Jogadores</h3>
        <Radar 
          data={getEfficiencyRadarData()} 
          options={{
            ...defaultOptions,
            scales: {
              r: {
                angleLines: { color: 'rgba(212, 175, 55, 0.1)' },
                grid: { color: 'rgba(212, 175, 55, 0.1)' },
                pointLabels: { color: '#d4af37' }
              }
            }
          }} 
        />
      </ChartContainer>

      <ChartContainer>
        <h3>Performance por Guild</h3>
        <Pie data={getGuildPerformanceData()} options={defaultOptions} />
      </ChartContainer>
    </ChartGrid>
  );
};

export default Charts;
