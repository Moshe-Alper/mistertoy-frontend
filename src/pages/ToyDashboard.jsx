
export function ToyDashboard() {
    
    return (
        <section className="toy-dashboard">
            <h1>Toy Dashboard</h1>
            <div className="charts-container">
                <div className="chart">
                    <h2>Prices per Label</h2>
                    {/* Add your chart component here */}
                </div>
                <div className="chart">
                    <h2>Inventory by Label</h2>
                    {/* Add your chart component here */}
                </div>
                <div className="chart">
                    <h2>Sales Trends</h2>
                    {/* Add your line chart component here */}
                </div>
            </div>
        </section>
    )
}
