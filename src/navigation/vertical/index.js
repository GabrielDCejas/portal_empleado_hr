const navigation = () => {
    return [
      {
        title: 'Home',
        icon: 'ic:outline-home',
        path: '/'
      },
      {
        title: 'Perfil',
        icon: 'mdi:account-eye-outline',
        path: '/perfil'
      },    
      {
        title: 'Licencias',
        icon: 'carbon:license-third-party',
        path: '/licencias'
      },
      {
        title: 'Carga Horaria',
        icon: 'tdesign:time',
        path: '/carga-horaria'
      },
      {
        title: 'Asignaciones',
        icon: 'wpf:note',
        path: '/asignaciones'
      },
      {
        title: 'Cursos',
        icon: 'mdi:university-outline',
        path: '/cursos'
      },
      {
        title: 'Organigrama',
        icon: 'clarity:organization-line',
        path: '/organigrama'
      },
      {
        title: 'Propuestas y mejoras',
        icon: 'tabler:message-plus',
        path: '/propuestas_mejoras'
      },
      {
        title: 'Evaluaciones',
        icon: 'carbon:chart-evaluation',
        children: [
          {
            title: "Evaluaciones de PGD",
            icon: "material-symbols-light:rate-review-outline",
            path: "/evaluaciones/evaluacion_pgd",
          },
        ]
      },
      {
        title: 'Solicitudes',
        icon: 'carbon:request-quote',
        children: [
          {
            title: "Requerimiento de Personal",
            icon: "icon-park-outline:file-staff",
            path: "/solicitudes/requerimiento_personal",
          },
        ]
      },
      
    ]
  }
  
  export default navigation