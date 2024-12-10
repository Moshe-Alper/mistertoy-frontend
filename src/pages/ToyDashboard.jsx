import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { faker } from '@faker-js/faker';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

import { loadToys } from '../store/actions/toy.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'

import { PricesChart } from '../cmps/PriceChart.jsx'
import { InventoryChart } from '../cmps/InventoryChart.jsx'
import { LineComp } from '../cmps/LineComp.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx';

export function ToyDashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [pricePerLabelData, setPricePerLabelData] = useState([])
    const [inventoryByLabelData, setInventoryByLabelData] = useState([])
    const [dataSetForLineChart, setDataSetForLineChart] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        (async () => {
            try {
                if (!toys.length) {
                    await loadToys()
                }
            } catch (err) {
                showErrorMsg('Cannot load toys')
            }
        })()
    }, [toys.length]) 
    

    useEffect(() => {
        const priceData = toyService.getPricePerLabelData(toys)
        setPricePerLabelData(priceData)

        const inventoryData = toyService.getInventoryByLabelData(toys)
        setInventoryByLabelData(inventoryData)

        const randomDataForLineChart = toyService.generateFakerData()
        setDataSetForLineChart(randomDataForLineChart)
    }, [toys])

    if (!toys) return <AppLoader />

    return (
        <section className="toy-dashboard">
            <h1>Toy Dashboard</h1>
            <h2>Statistics for {toys.length} Toys</h2>
            <div className="charts-container">
                <div className="chart-wrapper">
                    <PricesChart data={pricePerLabelData}/>
                </div>
                <div className="chart-wrapper">
                    <InventoryChart data={inventoryByLabelData} />
                </div>
                <div className="chart-wrapper">
                    <LineComp data={dataSetForLineChart} />
                </div>
            </div>
        </section>
    )
}
