/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function UiUxDesignSystem() {
  return (
    <div className="py-5" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* FOUNDATIONS */}
      <section className="mb-5">
        <h2 className="ui-section-title">Foundations</h2>
        <div className="row g-4 mb-4">
          <div className="col-auto text-center">
            <span className="ui-label">Base Layer</span>
            <div className="layer-base d-flex align-items-center justify-content-center mx-auto"></div>
          </div>
          <div className="col-auto text-center">
            <span className="ui-label">Raised Layer</span>
            <div className="layer-raised d-flex align-items-center justify-content-center mx-auto"></div>
          </div>
          <div className="col-auto text-center">
            <span className="ui-label">Inset Layer</span>
            <div className="layer-inset d-flex align-items-center justify-content-center mx-auto"></div>
          </div>
          <div className="col-auto text-center">
            <span className="ui-label">Pressed Layer</span>
            <div className="layer-pressed d-flex align-items-center justify-content-center mx-auto"></div>
          </div>
        </div>

        <div className="row g-4 mb-4 align-items-end">
          <div className="col-auto">
            <span className="ui-label">Elevation Levels</span>
            <div className="d-flex gap-3">
              <div className="layer-base d-flex align-items-center justify-content-center" style={{ width: '90px', height: '50px', fontSize: '0.7rem', textAlign: 'center' }}>Level 1<br/>(Flat)</div>
              <div className="layer-raised d-flex align-items-center justify-content-center" style={{ width: '90px', height: '50px', fontSize: '0.7rem', textAlign: 'center' }}>Level 2<br/>(Hover)</div>
              <div className="layer-raised d-flex align-items-center justify-content-center" style={{ width: '90px', height: '50px', fontSize: '0.7rem', textAlign: 'center', boxShadow: '8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light)' }}>Level 3<br/>(Raised)</div>
              <div className="layer-inset d-flex align-items-center justify-content-center" style={{ width: '90px', height: '50px', fontSize: '0.7rem', textAlign: 'center' }}>Level 4<br/>(Inset)</div>
            </div>
          </div>
          
          <div className="col-auto ms-5">
            <span className="ui-label">Radius Scale</span>
            <div className="d-flex gap-3 align-items-end">
              <div className="layer-raised d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', borderRadius: '4px', fontSize: '0.75rem' }}>4px</div>
              <div className="layer-raised d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', borderRadius: '8px', fontSize: '0.75rem' }}>8px</div>
              <div className="layer-raised d-flex align-items-center justify-content-center fw-bold" style={{ width: '56px', height: '56px', borderRadius: '12px', fontSize: '0.75rem' }}>12px</div>
              <div className="layer-raised d-flex align-items-center justify-content-center fw-bold" style={{ width: '64px', height: '64px', borderRadius: '16px', fontSize: '0.75rem' }}>16px</div>
              <div className="layer-raised d-flex align-items-center justify-content-center fw-bold" style={{ width: '72px', height: '72px', borderRadius: '24px', fontSize: '0.75rem' }}>24px</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="mb-5">
        <h2 className="ui-section-title">Controls</h2>
        <div className="row g-5">
          <div className="col-md-7">
            <div className="d-flex gap-4 mb-4">
              <div>
                <span className="ui-label">Primary Button</span>
                <button className="btn-primary">Submit Now</button>
              </div>
              <div>
                <span className="ui-label">Pressed State</span>
                <button className="btn-primary" style={{ boxShadow: 'inset 4px 4px 8px rgba(200,130,60,0.5), inset -4px -4px 8px rgba(255,200,130,0.5)' }}>
                  <span className="me-2">⟳</span>Sending...
                </button>
              </div>
              <div>
                <span className="ui-label">Disabled State</span>
                <button className="btn-secondary" disabled style={{ opacity: 0.6, boxShadow: 'inset 2px 2px 5px var(--shadow-dark)' }}>Not Available</button>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <span className="ui-label">Text Field</span>
                <input type="text" className="neumorphic-input mb-1" placeholder="Email Address" />
                <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Helper: Enter a valid email</small>
              </div>
              <div className="col-sm-6">
                <span className="ui-label">&nbsp;</span>
                <input type="text" className="neumorphic-input mb-1" placeholder="Email Address" style={{ border: '1px solid var(--theme-primary)' }} />
                <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Helper: Enter a valid email</small>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="row g-4">
              <div className="col-6">
                <span className="ui-label">Checkbox</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <div className="control-box active text-white" style={{ fontSize: '12px' }}>✓</div>
                    <span>Option 1</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="control-box"></div>
                    <span>Option 2</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <span className="ui-label">Radio</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <div className="control-box radio active">
                      <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                    </div>
                    <span>Option 1</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="control-box radio"></div>
                    <span>Option 2</span>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <span className="ui-label">Switch</span>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="switch-track active">
                    <div className="switch-thumb"></div>
                  </div>
                  <span className="fw-bold" style={{ fontSize: '0.8rem' }}>ON</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="switch-track">
                    <div className="switch-thumb"></div>
                  </div>
                  <span className="fw-bold text-secondary" style={{ fontSize: '0.8rem' }}>OFF</span>
                </div>
              </div>

              <div className="col-6">
                <span className="ui-label">Slider</span>
                <div className="position-relative mt-4">
                  <div className="badge-ui position-absolute" style={{ top: '-25px', left: '70%' }}>75%</div>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
                  <div className="d-flex justify-content-between mt-1 text-secondary" style={{ fontSize: '0.7rem' }}>
                    <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="mb-5">
        <h2 className="ui-section-title">Navigation</h2>
        <div className="row g-4 align-items-center">
          <div className="col-md-4">
            <span className="ui-label">Tabs</span>
            <div className="tabs-container">
              <div className="tab-item active">Overview</div>
              <div className="tab-item">Details</div>
              <div className="tab-item">Settings</div>
            </div>
          </div>
          
          <div className="col-md-5">
            <span className="ui-label">Breadcrumbs</span>
            <div className="btn-secondary d-inline-flex px-3 py-2" style={{ borderRadius: '8px', fontSize: '0.85rem' }}>
              Home / Categories / Product Details / <span className="fw-bold ms-1 text-dark">Edit</span>
            </div>
          </div>

          <div className="col-md-3">
            <span className="ui-label">Pagination</span>
            <div className="d-flex gap-2 align-items-center">
              <span className="text-secondary fw-bold" style={{ fontSize: '0.8rem' }}>PREV</span>
              <div className="pagination-item">1</div>
              <div className="pagination-item active">2</div>
              <div className="pagination-item">3</div>
              <div className="pagination-item">4</div>
              <span className="fw-bold" style={{ fontSize: '0.8rem' }}>NEXT</span>
            </div>
          </div>
        </div>
      </section>

      {/* DATA DISPLAY */}
      <section className="mb-5">
        <h2 className="ui-section-title">Data Display</h2>
        <div className="row g-4">
          <div className="col-md-3">
            <span className="ui-label">Cards</span>
            <div className="card-standard text-center">
              <div className="layer-inset mx-auto mb-3" style={{ width: '60px', height: '60px', borderRadius: '50%' }}></div>
              <h3 className="h6 fw-bold mb-1">Product Name</h3>
              <p className="text-secondary small mb-3">Short description here</p>
              <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View More</button>
            </div>
          </div>

          <div className="col-md-4">
            <span className="ui-label">List Items</span>
            <div className="d-flex flex-column gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="list-item">
                  <div className="avatar">
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt="Avatar" width="100%" height="100%" />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '0.9rem' }}>Title/Name</div>
                    <div className="text-secondary" style={{ fontSize: '0.8rem' }}>Short description here</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-5">
            <div className="mb-4">
              <span className="ui-label">Badges</span>
              <div className="d-flex gap-2">
                <span className="badge-ui">New</span>
                <span className="badge-ui" style={{ background: '#3b82f6' }}>Beta</span>
                <span className="badge-secondary">24</span>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="ui-label">Avatars</span>
              <div className="d-flex gap-3">
                <div className="avatar"><img src="https://i.pravatar.cc/100?img=11" alt="A" width="100%" height="100%" /></div>
                <div className="avatar"><img src="https://i.pravatar.cc/100?img=12" alt="B" width="100%" height="100%" /></div>
                <div className="avatar"><img src="https://i.pravatar.cc/100?img=13" alt="C" width="100%" height="100%" /></div>
              </div>
            </div>

            <div>
              <span className="ui-label">Compact Table Header</span>
              <div className="btn-secondary d-flex justify-content-between px-3 py-2" style={{ borderRadius: '8px', fontSize: '0.85rem' }}>
                <span className="fw-bold">Name (A-Z) ▼</span>
                <span>Date</span>
                <span>Status</span>
                <span>Action</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="mb-5">
        <h2 className="ui-section-title">Feedback</h2>
        <div className="row g-4">
          <div className="col-md-3">
            <span className="ui-label">Modal Confirmation</span>
            <div className="card-standard text-center">
              <h3 className="h6 fw-bold mb-3">Delete Account?</h3>
              <div className="layer-inset mx-auto mb-3 d-flex align-items-center justify-content-center text-warning" style={{ width: '50px', height: '50px', borderRadius: '50%', fontSize: '1.5rem', fontWeight: 'bold' }}>!</div>
              <p className="small mb-3">Are you sure?</p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Cancel</button>
                <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', background: '#d9534f' }}>Delete</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <span className="ui-label">Toast Stack</span>
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="btn-secondary d-flex align-items-center justify-content-between px-3 py-2" style={{ borderRadius: '8px' }}>
                <span className="fw-bold" style={{ fontSize: '0.85rem' }}>Success: File uploaded</span>
                <span className="text-success fw-bold">✓</span>
              </div>
              <div className="btn-secondary d-flex align-items-center justify-content-between px-3 py-2" style={{ borderRadius: '8px' }}>
                <span className="fw-bold" style={{ fontSize: '0.85rem' }}>Info: Updates available</span>
              </div>
            </div>

            <span className="ui-label">Spinner</span>
            <div className="d-flex gap-2 p-2">
               <div className="spinner-border text-primary" role="status" style={{ color: 'var(--theme-primary) !important' }}></div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="mb-4">
              <span className="ui-label">Alert Banner</span>
              <div className="alert-banner">
                <span className="fw-bold">!</span>
                <span style={{ fontSize: '0.85rem' }}>Important: System maintenance scheduled</span>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="ui-label">Linear Progress</span>
              <div className="d-flex align-items-center gap-3">
                <div className="progress-track flex-grow-1">
                  <div className="progress-fill" style={{ width: '50%' }}></div>
                </div>
                <span className="fw-bold" style={{ fontSize: '0.8rem' }}>50%</span>
              </div>
            </div>

            <div>
              <span className="ui-label">Skeleton Rows</span>
              <div className="skeleton-row" style={{ width: '100%' }}></div>
              <div className="skeleton-row" style={{ width: '80%' }}></div>
              <div className="skeleton-row" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
