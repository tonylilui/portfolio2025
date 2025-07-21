import { Typography, Paper, Stack, Box, Container, Button, Link, TextField, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10
    }
  }
} as const;

const formItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10
    }
  }
} as const;

const projectData = [
  {
    title: 'AI-Powered Code Assistant',
    description: 'A VS Code extension leveraging machine learning to provide intelligent code suggestions and auto-completions.',
    tech: ['TypeScript', 'React', 'Python', 'TensorFlow'],
    image: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
    github: 'https://github.com/yourusername/code-assistant',
    demo: 'https://marketplace.visualstudio.com'
  },
  {
    title: '3D Portfolio Website',
    description: 'An interactive portfolio website built with Three.js and React, featuring custom 3D animations and effects.',
    tech: ['React', 'Three.js', 'TypeScript', 'Framer Motion'],
    image: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
    github: 'https://github.com/yourusername/portfolio',
    demo: 'https://yourportfolio.com'
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management and payment processing.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)',
    github: 'https://github.com/yourusername/ecommerce',
    demo: 'https://yourecommerce.com'
  },
  {
    title: 'Blockchain Explorer',
    description: 'A web application for exploring and analyzing blockchain transactions with real-time updates.',
    tech: ['React', 'Web3.js', 'Node.js', 'PostgreSQL'],
    image: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)',
    github: 'https://github.com/yourusername/blockchain-explorer',
    demo: 'https://yourexplorer.com'
  }
];

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.3), transparent)'
              }
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                Welcome to My Portfolio
              </Typography>
              <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                Scroll down to explore my work and experience.
              </Typography>
            </motion.div>
          </Paper>
        </motion.section>

        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.3), transparent)'
              }
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                About Me
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                I'm a passionate developer focused on creating engaging web experiences.
              </Typography>
            </motion.div>
          </Paper>
        </motion.section>

        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                Featured Projects
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                Check out some of my best work as you scroll through this interactive portfolio.
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4,
                mt: 4
              }}>
                {projectData.map((project) => (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    style={{ height: '100%' }}
                  >
                    <Paper
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '120px',
                          background: project.image,
                          opacity: 0.2
                        }
                      }}
                    >
                      <Box sx={{ 
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        p: 3
                      }}>
                        <Typography 
                          variant="h5" 
                          gutterBottom
                          sx={{ 
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mt: 7
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          paragraph
                          sx={{ color: 'rgba(255, 255, 255, 0.8)', flexGrow: 1 }}
                        >
                          {project.description}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 1,
                          mb: 2
                        }}>
                          {project.tech.map((tech) => (
                            <Typography
                              key={tech}
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                background: 'rgba(74, 144, 226, 0.1)',
                                border: '1px solid rgba(74, 144, 226, 0.2)',
                                color: '#4a90e2'
                              }}
                            >
                              {tech}
                            </Typography>
                          ))}
                        </Box>
                        <Box sx={{ 
                          display: 'flex',
                          gap: 2,
                          mt: 'auto'
                        }}>
                          <Button
                            component={Link}
                            href={project.github}
                            target="_blank"
                            startIcon={<GitHubIcon />}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: 'rgba(74, 144, 226, 0.5)',
                              color: '#4a90e2',
                              '&:hover': {
                                borderColor: '#4a90e2',
                                background: 'rgba(74, 144, 226, 0.1)'
                              }
                            }}
                          >
                            Code
                          </Button>
                          <Button
                            component={Link}
                            href={project.demo}
                            target="_blank"
                            startIcon={<LaunchIcon />}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: 'rgba(74, 144, 226, 0.5)',
                              color: '#4a90e2',
                              '&:hover': {
                                borderColor: '#4a90e2',
                                background: 'rgba(74, 144, 226, 0.1)'
                              }
                            }}
                          >
                            Live Demo
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Paper>
        </motion.section>

        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                Get in Touch
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                Interested in working together? Let's connect!
              </Typography>

              <Box 
                component="form" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  
                  // Email validation
                  const email = formData.get('email') as string;
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                  }

                  try {
                    await emailjs.send(
                      'template_contact', // Replace with your EmailJS service ID
                      'template_1kjdm94', // Replace with your EmailJS template ID
                      {
                        from_name: formData.get('name'),
                        from_email: email,
                        message: formData.get('message'),
                        to_email: 'tony.lilui@live.com',
                      },
                      'q70Fxa0fZZECYPrQg' // Replace with your EmailJS public key
                    );
                    alert('Message sent successfully! I\'ll get back to you soon.');
                    form.reset();
                  } catch (error) {
                    console.error('Failed to send email:', error);
                    alert('Failed to send message. Please try again later.');
                  }
                }}
                sx={{ 
                  mt: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: -40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '150px',
                    height: '4px',
                    background: 'linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.3), transparent)',
                    borderRadius: '2px'
                  }
                }}
              >
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 3
                }}>
                  <motion.div variants={formItemVariants}>
                    <TextField
                      required
                      fullWidth
                      name="name"
                      label="Your Name"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(26, 32, 44, 0.4)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          color: 'rgba(255, 255, 255, 0.9)',
                          transition: 'all 0.3s ease',
                          '& fieldset': {
                            borderColor: 'rgba(74, 144, 226, 0.2)',
                            transition: 'all 0.3s ease',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(74, 144, 226, 0.4)',
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                            '& fieldset': {
                              borderColor: '#4a90e2',
                              borderWidth: '2px',
                            }
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(74, 144, 226, 0.8)',
                          '&.Mui-focused': {
                            color: '#4a90e2',
                          }
                        },
                        '& .MuiInputBase-input': {
                          padding: '16px',
                        }
                      }}
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <TextField
                      required
                      fullWidth
                      name="email"
                      label="Your Email"
                      type="email"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(26, 32, 44, 0.4)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          color: 'rgba(255, 255, 255, 0.9)',
                          transition: 'all 0.3s ease',
                          '& fieldset': {
                            borderColor: 'rgba(74, 144, 226, 0.2)',
                            transition: 'all 0.3s ease',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(74, 144, 226, 0.4)',
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                            '& fieldset': {
                              borderColor: '#4a90e2',
                              borderWidth: '2px',
                            }
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(74, 144, 226, 0.8)',
                          '&.Mui-focused': {
                            color: '#4a90e2',
                          }
                        },
                        '& .MuiInputBase-input': {
                          padding: '16px',
                        }
                      }}
                    />
                  </motion.div>
                </Box>
                <motion.div variants={formItemVariants}>
                  <TextField
                    required
                    fullWidth
                    name="message"
                    label="Your Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(26, 32, 44, 0.4)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          borderColor: 'rgba(74, 144, 226, 0.2)',
                          transition: 'all 0.3s ease',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(74, 144, 226, 0.4)',
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                          '& fieldset': {
                            borderColor: '#4a90e2',
                            borderWidth: '2px',
                          }
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(74, 144, 226, 0.8)',
                        '&.Mui-focused': {
                          color: '#4a90e2',
                        }
                      },
                      '& .MuiInputBase-input': {
                        padding: '16px',
                      }
                    }}
                  />
                </motion.div>
                <motion.div 
                  variants={formItemVariants}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      boxShadow: '0 4px 15px rgba(74, 144, 226, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2170b0, #4a90e2)',
                        boxShadow: '0 6px 20px rgba(74, 144, 226, 0.3)',
                        transform: 'translateY(-1px)'
                      },
                      '&:active': {
                        transform: 'translateY(1px)'
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </motion.div>
              </Box>

              <Box sx={{ 
                mt: 6,
                pt: 4,
                borderTop: '1px solid rgba(74, 144, 226, 0.2)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3
              }}>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Or connect with me on:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <IconButton
                      component={Link}
                      href="https://github.com/tonylilui"
                      target="_blank"
                      sx={{
                        color: '#4a90e2',
                        border: '1px solid rgba(74, 144, 226, 0.3)',
                        '&:hover': {
                          background: 'rgba(74, 144, 226, 0.1)',
                          borderColor: '#4a90e2'
                        }
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <IconButton
                      component={Link}
                      href="https://linkedin.com/in/tonylilui"
                      target="_blank"
                      sx={{
                        color: '#4a90e2',
                        border: '1px solid rgba(74, 144, 226, 0.3)',
                        '&:hover': {
                          background: 'rgba(74, 144, 226, 0.1)',
                          borderColor: '#4a90e2'
                        }
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <IconButton
                      component={Link}
                      href="https://www.instagram.com/tonystackofficial"
                      target="_blank"
                      sx={{
                        color: '#4a90e2',
                        border: '1px solid rgba(74, 144, 226, 0.3)',
                        '&:hover': {
                          background: 'rgba(74, 144, 226, 0.1)',
                          borderColor: '#4a90e2'
                        }
                      }}
                    >
                      <InstagramIcon />
                    </IconButton>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Paper>
        </motion.section>
      </Stack>
    </Container>
  );
}