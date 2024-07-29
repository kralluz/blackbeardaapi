import Event from '../interfaces/Event';

function linkGeneratetoCalendar(event: Event): string {
    // Função para formatar data e hora no formato ISO 8601
    const formatDate = (dateString: Date | string): string => {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:.]/g, '').replace(/Z/g, '') + 'Z';
    };

    // Montagem da URL com os parâmetros fornecidos
    const urlBase = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const parametros = {
        text: encodeURIComponent(event.titulo),
        dates: `${formatDate(event.dataInicio)}/${formatDate(event.dataFim)}`,
        details: encodeURIComponent(event.descricao),
        location: encodeURIComponent(event.localizacao)
    };

    // Montagem da URL final
    const urlFinal = `${urlBase}&text=${parametros.text}&dates=${parametros.dates}&details=${parametros.details}&location=${parametros.location}`;
    
    return urlFinal;
}

export default linkGeneratetoCalendar;
