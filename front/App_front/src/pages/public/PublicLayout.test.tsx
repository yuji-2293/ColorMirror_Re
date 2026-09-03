import { render, screen } from '@testing-library/react';
import PublicLayout from '@/pages/public/PublicLayout';

const { mockUseLocation, mockNavigate, mockOutlet } = vi.hoisted(() => ({
  mockUseLocation: vi.fn(),
  mockNavigate: vi.fn(() => <div>Navigate</div>),
  mockOutlet: vi.fn(() => <div>Outlet</div>),
}));

vi.mock('react-router-dom', () => ({
  useLocation: mockUseLocation,
  Navigate: mockNavigate,
  Outlet: mockOutlet,
}));

const mockAuthState = {
  authStatus: 'unknown',
  redirectedReason: null,
};

vi.mock('@/app/store/useAuthStore', () => ({
  useAuthStore: vi.fn((state) => {
    if (state) return state(mockAuthState);
    return mockAuthState;
  }),
}));

vi.mock('@/pages/public/components/Loading', () => ({
  Loading: vi.fn(() => <div>Loading</div>),
}));

vi.mock('@/components/layout/header', () => ({
  Header: vi.fn(() => <div>Header</div>),
}));

vi.mock('@/components/layout/footer', () => ({
  Footer: vi.fn(() => <div>Footer</div>),
}));

describe('PublicLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLocation.mockReturnValue({
      pathname: '/test',
    });
    mockAuthState.authStatus = 'unknown';
    mockAuthState.redirectedReason = null;
  });
  it('authStatusがunknownの場合、Loadingコンポーネントが表示されること', () => {
    render(<PublicLayout />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
  it('authStatusがauthenticatedの場合、Navigateコンポーネントが表示されること', () => {
    mockAuthState.authStatus = 'authenticated';
    render(<PublicLayout />);
    expect(screen.getByText('Navigate')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/',
        replace: true,
      }),
      undefined
    );
  });
  it('authStatusがunauthenticatedの場合、Outletコンポーネントが表示されること', () => {
    mockAuthState.authStatus = 'unauthenticated';
    render(<PublicLayout />);
    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });
});
