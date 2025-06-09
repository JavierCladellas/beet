import '../styles/ClientsGrid.css';

const ClientsGrid = () => {
    return (
        <div className="clients-grid">
            <div className="client-card">
                <img src="/logos/davivienda.jpg" alt="Davivienda" />
            </div>
            <div className="client-card">
                <img src="/logos/excel.jpg" alt="Excel Automotriz" />
            </div>
            <div className="client-card">
                <img src="/logos/teleperformance.jpg" alt="Teleperformance" />
            </div>
            <div className="client-card">
                <img src="/logos/mccormick.jpg" alt="McCormick" />
            </div>
            <div className="client-card">
                <img src="/logos/maxbloch.jpg" alt="MaxBloch" />
            </div>
            <div className="client-card">
                <img src="/logos/andher.jpg" alt="AndHer" />
            </div>
            <div className="client-card">
                <img src="/logos/rsm.jpg" alt="RSM" />
            </div>
            <div className="client-card">
                <img src="/logos/roadmarket.jpg" alt="RoadMarket" />
            </div>
        </div>
    );
}
export default ClientsGrid;