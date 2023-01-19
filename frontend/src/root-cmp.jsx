import React from 'react'
import { Routes, Route, useParams } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { useSelector } from 'react-redux'
import { toggleExpand } from './store/stay.actions'

export function RootCmp() {

    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)
    function onToggleExpand() {
        toggleExpand(false)
    }
    function dontDoNothing() {
        // console.log(`hi`)
    }
    return (
        <div>
            <AppHeader />
            <main onClick={(isHeadFilterExpanded) ? onToggleExpand : dontDoNothing} className={`main-layout ${(isHeadFilterExpanded) ? 'expanded' : ''}`}>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


