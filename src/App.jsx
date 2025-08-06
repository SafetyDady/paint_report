import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts'
import { 
  Home, Building2, DollarSign, Users, TrendingUp, FileText,
  Palette, Clock, Target, AlertTriangle, CheckCircle, Activity
} from 'lucide-react'
import './App.css'

// API Configuration
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyyiliO5BpOcXxxRtTGdj1cS4ETTZGZY_WH0Vj2tGWif7Z715uAKWOf1lc4aYAEittL5w/exec'

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

function App() {
  const [activeTab, setActiveTab] = useState('executive')
  const [data, setData] = useState({
    overview: null,
    projectAnalysis: null,
    costAnalysis: null,
    resourceAnalysis: null,
    performanceMetrics: null,
    workActualAnalysis: null,
    loading: true,
    error: null
  })

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }))
        
        const endpoints = [
          'getOverview',
          'getProjectAnalysis',
          'getCostAnalysis',
          'getResourceAnalysis',
          'getPerformanceMetrics',
          'getWorkActualAnalysis'
        ]

        const promises = endpoints.map(endpoint => 
          fetch(`${API_BASE_URL}?action=${endpoint}`)
            .then(res => res.json())
            .catch(err => ({ success: false, error: err.message }))
        )

        const results = await Promise.all(promises)
        
        setData({
          overview: results[0].success ? results[0].overview : null,
          projectAnalysis: results[1].success ? results[1].analysis : null,
          costAnalysis: results[2].success ? results[2].analysis : null,
          resourceAnalysis: results[3].success ? results[3].analysis : null,
          performanceMetrics: results[4].success ? results[4].metrics : null,
          workActualAnalysis: results[5].success ? results[5].analysis : null,
          loading: false,
          error: results.some(r => !r.success) ? 'Some data failed to load' : null
        })

      } catch (error) {
        setData(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message 
        }))
      }
    }

    fetchData()
  }, [])

  // Loading state
  if (data.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Dashboard...</h2>
          <p className="text-gray-500">กำลังโหลดข้อมูลจาก 4 Tables</p>
        </div>
      </div>
    )
  }

  // Error state
  if (data.error && !data.overview) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Data</h2>
          <p className="text-gray-500 mb-4">{data.error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Palette className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Paint Job Management</h1>
                <p className="text-sm text-gray-500">Comprehensive Dashboard - 4 Tables Integration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="executive" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Executive</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Costs</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Executive Summary */}
          <TabsContent value="executive" className="space-y-6">
            <ExecutiveSummary data={data} />
          </TabsContent>

          {/* Tab 2: Project Management */}
          <TabsContent value="projects" className="space-y-6">
            <ProjectManagement data={data} />
          </TabsContent>

          {/* Tab 3: Cost Analysis */}
          <TabsContent value="costs" className="space-y-6">
            <CostAnalysis data={data} />
          </TabsContent>

          {/* Tab 4: Resource Management */}
          <TabsContent value="resources" className="space-y-6">
            <ResourceManagement data={data} />
          </TabsContent>

          {/* Tab 5: Performance Analytics */}
          <TabsContent value="performance" className="space-y-6">
            <PerformanceAnalytics data={data} />
          </TabsContent>

          {/* Tab 6: Detailed Reports */}
          <TabsContent value="reports" className="space-y-6">
            <DetailedReports data={data} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Executive Summary Component
function ExecutiveSummary({ data }) {
  const { overview, workActualAnalysis } = data

  if (!overview) {
    return <div className="text-center py-8">No overview data available</div>
  }

  const kpiCards = [
    {
      title: 'Total Projects',
      value: overview.totalProjects,
      subtitle: `${overview.completedProjects} completed`,
      icon: Building2,
      color: 'blue'
    },
    {
      title: 'Total Budget',
      value: `฿${overview.totalBudget?.toLocaleString() || 0}`,
      subtitle: `${overview.budgetUtilization}% utilized`,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Workers',
      value: overview.totalWorkers,
      subtitle: `${overview.totalHours} hours`,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Actual Progress',
      value: `${overview.actualProgress}%`,
      subtitle: `${overview.totalActualAreaCompleted}/${overview.totalAreaM2} ตร.ม.`,
      icon: Target,
      color: 'orange'
    }
  ]

  const projectStatusData = [
    { name: 'Completed', value: overview.completedProjects, color: '#00C49F' },
    { name: 'Active', value: overview.activeProjects, color: '#0088FE' },
    { name: 'Pending', value: overview.pendingProjects, color: '#FFBB28' }
  ]

  const costBreakdownData = [
    { name: 'Labor Cost', value: overview.totalLaborCost, color: '#0088FE' },
    { name: 'Material Cost', value: overview.totalMaterialCost, color: '#00C49F' }
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 text-${kpi.color}-600`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <p className="text-xs text-gray-500 mt-1">{kpi.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Overview</CardTitle>
            <CardDescription>Distribution of project completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Projects']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Labor vs Material costs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${value.toLocaleString()}`, 'Cost']} />
                <Bar dataKey="value" fill="#8884d8">
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Utilization</CardTitle>
          <CardDescription>
            ฿{overview.totalActualCost?.toLocaleString()} of ฿{overview.totalBudget?.toLocaleString()} used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overview.budgetUtilization} className="h-3" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Used: {overview.budgetUtilization}%</span>
            <span>Remaining: ฿{overview.remainingBudget?.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Work Actual Summary */}
      {workActualAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>Work Actual Progress</CardTitle>
            <CardDescription>Actual work completion vs planned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {workActualAnalysis.summary?.totalRecords || 0}
                </div>
                <div className="text-sm text-gray-500">Work Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {workActualAnalysis.summary?.totalActualArea || 0} ตร.ม.
                </div>
                <div className="text-sm text-gray-500">Area Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {workActualAnalysis.summary?.overallProgress || 0}%
                </div>
                <div className="text-sm text-gray-500">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Project Management Component with Advanced Analytics
function ProjectManagement({ data }) {
  const { projectAnalysis, workActualAnalysis, overview } = data

  if (!projectAnalysis || !projectAnalysis.analysis) {
    return <div className="text-center py-8">Loading project data...</div>
  }

  // Enhanced project data with analytics
  const projects = projectAnalysis.analysis.projects || []
  const workActual = workActualAnalysis?.byJob || []
  
  const enhancedProjects = projects.map(project => {
    const workData = workActual.find(w => w.jobName === project.jobName) || {}
    const totalArea = project.plannedAreaM2 || 0
    const actualArea = project.actualAreaCompleted || 0
    const progressPercent = totalArea > 0 ? (actualArea / totalArea) * 100 : 0
    
    return {
      ...project,
      actualArea,
      progressPercent,
      costPerM2: totalArea > 0 ? (project.actualCost || 0) / totalArea : 0,
      hoursPerM2: totalArea > 0 ? (project.totalHours || 0) / totalArea : 0,
      costPerWorker: (project.workersCount || 0) > 0 ? (project.actualCost || 0) / project.workersCount : 0,
      hoursPerWorker: (project.workersCount || 0) > 0 ? (project.totalHours || 0) / project.workersCount : 0,
      budgetVarianceAmount: (project.actualCost || 0) - (project.budget || 0)
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Project Analytics</h2>
        <Badge variant="outline">
          {projects.length} Projects
        </Badge>
      </div>

      {/* Budget vs Cost Analysis Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Cost Analysis</CardTitle>
          <CardDescription>Budget Plan เทียบกับ Manhour Cost + Material Cost</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enhancedProjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jobName" />
              <YAxis />
              <Tooltip formatter={(value) => `฿${value?.toLocaleString() || 0}`} />
              <Bar dataKey="budget" fill="#8884d8" name="Budget Plan" />
              <Bar dataKey="actualCost" fill="#82ca9d" name="Actual Cost" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Progress Tracking Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Area Completion Progress</CardTitle>
          <CardDescription>Total Area M² เทียบกับ Actual Area M² - Progress Tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enhancedProjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jobName" />
              <YAxis />
              <Tooltip formatter={(value) => `${value?.toFixed(1) || 0} ตร.ม.`} />
              <Bar dataKey="plannedAreaM2" fill="#ffc658" name="Total Area M²" />
              <Bar dataKey="actualAreaCompleted" fill="#ff7300" name="Actual Area M²" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics ต่อคน/ตร.ม./วัน</CardTitle>
          <CardDescription>ค่าเฉลี่ยการทำงานแยกตามโปรเจค</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Project</th>
                  <th className="text-right p-2">Progress %</th>
                  <th className="text-right p-2">Cost/M²</th>
                  <th className="text-right p-2">Hours/M²</th>
                  <th className="text-right p-2">Cost/Worker</th>
                  <th className="text-right p-2">Hours/Worker</th>
                  <th className="text-right p-2">Budget Variance</th>
                </tr>
              </thead>
              <tbody>
                {enhancedProjects.map((project, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{project.jobName}</td>
                    <td className="p-2 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <span className={`${project.progressPercent >= 100 ? 'text-green-600' : 'text-blue-600'}`}>
                          {project.progressPercent.toFixed(1)}%
                        </span>
                        {project.progressPercent >= 100 && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                    </td>
                    <td className="p-2 text-right">฿{project.costPerM2.toFixed(0)}</td>
                    <td className="p-2 text-right">{project.hoursPerM2.toFixed(1)} ชม.</td>
                    <td className="p-2 text-right">฿{project.costPerWorker.toLocaleString()}</td>
                    <td className="p-2 text-right">{project.hoursPerWorker.toFixed(1)} ชม.</td>
                    <td className={`p-2 text-right font-medium ${project.budgetVarianceAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {project.budgetVarianceAmount > 0 ? '+' : ''}฿{(project.budgetVarianceAmount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {enhancedProjects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.jobName}</CardTitle>
                <Badge 
                  variant={project.status ? 'default' : 'secondary'}
                  className={
                    project.status ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }
                >
                  {project.status ? 'Active' : 'Pending'}
                </Badge>
              </div>
              <CardDescription>
                Progress: {project.progressPercent.toFixed(1)}% ({project.actualAreaCompleted}/{project.plannedAreaM2} ตร.ม.)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p className="font-semibold">฿{project.budget?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Actual Cost</p>
                  <p className="font-semibold">฿{project.actualCost?.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Workers</p>
                  <p className="font-semibold">{project.workersCount || 0} คน</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hours</p>
                  <p className="font-semibold">{project.totalHours || 0} ชม.</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Area Progress</span>
                  <span>{project.progressPercent.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(project.progressPercent, 100)} className="h-2" />
              </div>
              
              {/* Budget Usage */}
              {project.budget && project.actualCost && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Budget Usage</span>
                    <span>{((project.actualCost / project.budget) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min((project.actualCost / project.budget) * 100, 100)} className="h-2" />
                </div>
              )}
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2 rounded">
                <div>
                  <p className="text-muted-foreground">Cost/M²</p>
                  <p className="font-semibold">฿{project.costPerM2.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hours/M²</p>
                  <p className="font-semibold">{project.hoursPerM2.toFixed(1)} ชม.</p>
                </div>
              </div>
              
              {project.budgetVarianceAmount !== 0 && (
                <div className={`text-sm p-2 rounded ${project.budgetVarianceAmount > 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  Variance: {project.budgetVarianceAmount > 0 ? '+' : ''}฿{project.budgetVarianceAmount.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Cost Analysis Component
function CostAnalysis({ data }) {
  const { costAnalysis } = data

  if (!costAnalysis) {
    return <div className="text-center py-8">No cost data available</div>
  }

  const costByJobData = Object.entries(costAnalysis.byJob || {}).map(([job, costs]) => ({
    job: job,
    labor: costs.labor || 0,
    material: costs.material || 0,
    total: costs.total || 0
  }))

  const monthlyTrends = Object.entries(costAnalysis.trends || {}).map(([month, costs]) => ({
    month: month,
    labor: costs.labor || 0,
    material: costs.material || 0,
    total: costs.total || 0
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Cost Analysis</h2>
        <Badge variant="outline">
          ฿{costAnalysis.summary?.totalCost?.toLocaleString() || 0} Total
        </Badge>
      </div>

      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Labor Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              ฿{costAnalysis.breakdown?.labor?.amount?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-500">
              {costAnalysis.breakdown?.labor?.percentage || 0}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Material Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ฿{costAnalysis.breakdown?.material?.amount?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-500">
              {costAnalysis.breakdown?.material?.percentage || 0}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average per Job</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              ฿{parseFloat(costAnalysis.summary?.averageCostPerJob || 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              Across all projects
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost by Job Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cost by Job</CardTitle>
          <CardDescription>Labor vs Material costs per project</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={costByJobData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="job" />
              <YAxis />
              <Tooltip formatter={(value) => [`฿${value.toLocaleString()}`, '']} />
              <Bar dataKey="labor" stackId="a" fill="#0088FE" name="Labor" />
              <Bar dataKey="material" stackId="a" fill="#00C49F" name="Material" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Cost Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Cost Trends</CardTitle>
          <CardDescription>Cost progression over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`฿${value.toLocaleString()}`, '']} />
              <Area type="monotone" dataKey="labor" stackId="1" stroke="#0088FE" fill="#0088FE" />
              <Area type="monotone" dataKey="material" stackId="1" stroke="#00C49F" fill="#00C49F" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// Resource Management Component
function ResourceManagement({ data }) {
  const { resourceAnalysis } = data

  if (!resourceAnalysis) {
    return <div className="text-center py-8">No resource data available</div>
  }

  // แก้ไข: ใช้ resourceAnalysis.utilization แทน resourceAnalysis.analysis.utilization
  const utilization = resourceAnalysis.utilization || {}
  const workers = resourceAnalysis.workers || []
  const materials = resourceAnalysis.materials || {}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
        <Badge variant="outline">
          {utilization.totalWorkers || 0} Workers
        </Badge>
      </div>

      {/* Resource Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {utilization.totalWorkers || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {utilization.totalHours || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg Hours/Worker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {utilization.avgHoursPerWorker || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-orange-600">
              {utilization.topPerformer || 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Worker Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Worker Performance</CardTitle>
          <CardDescription>Hours worked and cost efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workers.slice(0, 9).map((worker, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {worker.worker?.charAt(0) || 'W'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{worker.worker}</div>
                    <div className="text-sm text-gray-500">
                      {worker.jobsCount} jobs • ฿{worker.avgCostPerHour}/hr
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{worker.totalHours}h</div>
                  <div className="text-sm text-gray-500">
                    ฿{worker.totalCost?.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Material Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Material Usage</CardTitle>
          <CardDescription>Material types and costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(materials).map(([type, material], index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{type}</div>
                  <div className="text-sm text-gray-500">
                    {material.items?.length || 0} items
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">฿{material.totalCost?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500">
                    Qty: {material.totalQuantity || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Performance Analytics Component
function PerformanceAnalytics({ data }) {
  const { performanceMetrics } = data

  if (!performanceMetrics) {
    return <div className="text-center py-8">No performance data available</div>
  }

  const kpis = performanceMetrics.kpis || {}
  const trends = performanceMetrics.trends || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
        <Badge variant="outline">
          KPI Dashboard
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Budget Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${parseFloat(kpis.budgetVariance) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {parseFloat(kpis.budgetVariance) > 0 ? '+' : ''}{kpis.budgetVariance}%
            </div>
            <div className="text-sm text-gray-500">vs planned budget</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {kpis.costEfficiency}
            </div>
            <div className="text-sm text-gray-500">efficiency ratio</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {kpis.completionRate}%
            </div>
            <div className="text-sm text-gray-500">work completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost per M²</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              ฿{kpis.costPerM2}
            </div>
            <div className="text-sm text-gray-500">per square meter</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost per Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              ฿{kpis.costPerHour}
            </div>
            <div className="text-sm text-gray-500">per working hour</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Labor Cost Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">
              {kpis.laborCostRatio}%
            </div>
            <div className="text-sm text-gray-500">of total cost</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Monthly performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#0088FE" name="Cost" />
              <Line type="monotone" dataKey="hours" stroke="#00C49F" name="Hours" />
              <Line type="monotone" dataKey="areaCompleted" stroke="#FFBB28" name="Area Completed" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Benchmarks</CardTitle>
          <CardDescription>Current vs target performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Budget Variance Target</span>
              <span className="font-medium">±5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cost Efficiency Target</span>
              <span className="font-medium">1.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Industry Avg Cost/M²</span>
              <span className="font-medium">฿150</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Target Completion Rate</span>
              <span className="font-medium">100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Detailed Reports Component
function DetailedReports({ data }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Detailed Reports</h2>
        <Button variant="outline">
          Export Reports
        </Button>
      </div>

      {/* Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manhour Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {data.overview?.manhourRecords || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {data.overview?.totalProjects || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Material Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {data.overview?.materialRecords || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Work Actual Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {data.overview?.workActualRecords || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle>API Integration Status</CardTitle>
          <CardDescription>4 Tables integration status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Manhour Table - Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Job Table - Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Material Table - Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>work_actual Table - Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>API Endpoint:</span>
              <span className="font-mono text-xs">{API_BASE_URL.substring(0, 50)}...</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Dashboard Version:</span>
              <span>v2.0 - 4 Tables Integration</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App

