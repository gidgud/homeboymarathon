
const dataCache = {}

async function navigateTo(pageId) {

    document.querySelectorAll('.page').forEach(a => a.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    if(pageId === 'event-page' && !dataCache.events) {
        dataCache.events = await fetchEvents()
    }

}