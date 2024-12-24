import * as XLSX from 'xlsx';

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Atualizado para começar na linha 7 (índice 6)
        const range = {
          s: { r: 6, c: 1 }, // Começa na linha 7 (índice 6), coluna B (índice 1)
          e: { r: worksheet['!ref'] ? XLSX.utils.decode_range(worksheet['!ref']).e.r : 100, c: 9 } // Até a última linha, coluna J
        };

        // Converter para array de objetos com as colunas específicas
        const rawData = XLSX.utils.sheet_to_json(worksheet, {
          range: range,
          header: ['player', 'guild', 'kills', 'assists', 'dmgDealt', 'damageTaken', 'healing', 'damageHealRatio', 'damageToKill']
        });

        // Filtrar linhas vazias e mapear os dados
        const mappedData = rawData
          .filter(row => row.player) // Remove linhas vazias
          .map(row => ({
            player: row.player || '',
            guild: row.guild || '',
            kills: Number(row.kills) || 0,
            assists: Number(row.assists) || 0,
            dmgDealt: Number(row.dmgDealt) || 0,
            damageTaken: Number(row.damageTaken) || 0,
            healing: Number(row.healing) || 0,
            damageHealRatio: Number(row.damageHealRatio) || 0,
            damageToKill: Number(row.damageToKill) || 0
          }));

        console.log('Dados processados:', mappedData); // Para debug
        resolve(mappedData);
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error('Erro ao ler arquivo:', error);
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
};