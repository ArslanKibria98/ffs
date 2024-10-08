import "./index.css"
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// layouts

import RootLayout from "./layouts/RootLayout";
import BuilderLayout from "./layouts/BuilderLayout";

// views without layouts

import AuthHandover from "./views/page";
import FormBuilder from "./views/form-builder/page";
import FormRender from "./views/render-form/page";

import BuilderPage from "./views/form-builder/form/page";
import FormSettingsPage from "./views/form-builder/form/settings/page";
import FormPreviewPage from "./views/form-builder/form/preview/page";
import FormVersionPage from "./views/form-builder/form/formVersions/page";
import FormSavePage from "./views/form-builder/form/save/page";
import FormPublishPage from "./views/form-builder/form/publish/page";
import FormTable from "./views/form-builder/form/formTable/page";
import InstantPreview from "./views/instant-preview/page"
import DeleteRepository, { EditRepository } from "./views/repository/page";
import Unauthenticated from "./views/unauthenticated/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* add routes with layouts */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<AuthHandover />} />
          <Route path=":token" element={<AuthHandover />} />
          <Route path="form-builder" element={<FormBuilder />} />
          <Route path="form-version-table/:id" element={<FormTable />} />
          <Route path="form-instant-preview/:fromId/:instantId" element={<InstantPreview />} />
          <Route path="form-versions/:formId/:versionId" element={<FormVersionPage />} />
          <Route path="render-form/:id" element={<FormRender />} />
          <Route path="repository/edit/:id" element={<EditRepository />} />
          <Route path="repository/delete/:id" element={<DeleteRepository />} />
          <Route path="form-builder/form" element={<BuilderLayout />}>
            <Route index element={<BuilderPage />} />
            <Route path="settings" element={<FormSettingsPage />} />
            <Route path="preview" element={<FormPreviewPage />} />
            <Route path="save" element={<FormSavePage />} />
            <Route path="publish" element={<FormPublishPage />} />
          </Route>
          <Route path="unauthenticated" element={<Unauthenticated />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}