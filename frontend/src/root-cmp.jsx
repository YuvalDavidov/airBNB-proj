import React from 'react'
import { Routes, Route, useParams } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { useSelector } from 'react-redux'
import { toggleExpand } from './store/stay.actions'
import { Dashboard } from './pages/dashboard'
import { StayEdit } from './cmps/stay-edit'
import { Listings } from './cmps/listings'
import { Reservations } from './cmps/Reservations'

export function RootCmp() {
  const isHeadFilterExpanded = useSelector(
    (storeState) => storeState.stayModule.isHeadFilterExpanded
  )
  function onToggleExpand() {
    toggleExpand(false)
  }
  function dontDoNothing() {
    // console.log(`hi`)
  }
  return (
    <div>
      <AppHeader />
      <main
        onClick={isHeadFilterExpanded ? onToggleExpand : dontDoNothing}
        className={`main-layout ${isHeadFilterExpanded ? 'expanded' : ''}`}
      >
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
          <Route element={<Dashboard />} path="/dashboard">
            <Route element={<StayEdit />} path="/dashboard" />
            <Route element={<StayEdit />} path="/dashboard/:stayId" />
            <Route element={<Listings />} path="/dashboard/listings" />
            <Route element={<Reservations />} path="/dashboard/reservations" />

          </Route>

          <Route path='user/:id' element={<UserDetails />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
