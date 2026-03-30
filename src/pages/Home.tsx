import {
  Typography,
  Paper,
  Box,
  Container,
  Button,
  Link,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import emailjs from '@emailjs/browser';
import { useState, useEffect } from 'react';

// ── Animation variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Data ─────────────────────────────────────────────────────────────
const projectData = [
  {
    title: 'Secure Geo-Intelligence (GEOINT) Dashboard',
    description:
      'A real-time situational awareness platform for monitoring maritime or aerial assets. Implements geofencing alerts and spatial data visualization for territorial security.',
    tech: ['OpenLayers', 'Node.js', 'WebSockets', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
    github: 'https://github.com/tonylilui/01-Secure-Geo-Intelligence-GEOINT-Dashboard',
    demo: 'https://your-geoint-demo.com',
    focus: 'Spatial Interest / Real-time Monitoring',
  },
  {
    title: 'Air-Gapped Sovereign AI Pipeline',
    description:
      'A private Retrieval-Augmented Generation (RAG) system designed for Protected-B document analysis. Operates entirely on-premises with no external API dependencies.',
    tech: ['Ollama', 'Llama 3', 'Python', 'ChromaDB', 'LangChain'],
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
    github: 'https://github.com/tonylilui/02-Air-Gapped-Sovereign-AI-Pipeline',
    demo: 'https://your-sovereignai-demo.com',
    focus: 'Data Sovereignty / AI Security',
  },
  {
    title: 'Zero-Trust File Integrity Monitor (FIM)',
    description:
      'A high-performance security tool that cryptographically verifies system files in real-time. Detects unauthorized tampering and triggers automated incident response alerts.',
    tech: ['Go', 'gRPC', 'SHA-256', 'Linux System Calls', 'React'],
    gradient: 'linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)',
    github: 'https://github.com/tonylilui/03-Zero-Trust-File-Integrity-Monitor-FIM-',
    demo: 'https://your-fim-demo.com',
    focus: 'Cyber Defence / Cryptography',
  },
  {
    title: 'Automated Infrastructure Hardening (IaC)',
    description:
      'Infrastructure-as-Code pipeline to deploy STIG-compliant Linux environments. Automates security patching, firewall configuration, and auditing for federal compliance.',
    tech: ['Ansible', 'Terraform', 'Docker', 'Bash', 'RHEL/Ubuntu'],
    gradient: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)',
    github: 'https://github.com/tonylilui/04-Automated-Infrastructure-Hardening-IaC-',
    demo: 'https://your-iac-demo.com',
    focus: 'DevSecOps / Government Compliance',
  },
];

// ── Shared Styles ────────────────────────────────────────────────────
const glassCard = {
  background: 'rgba(15, 23, 42, 0.45)',
  backdropFilter: 'blur(24px)',
  borderRadius: '20px',
  border: '1px solid rgba(96, 165, 250, 0.08)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(15, 23, 42, 0.4)',
    borderRadius: '12px',
    color: '#e2e8f0',
    transition: 'all 0.2s ease',
    '& fieldset': { borderColor: 'rgba(96, 165, 250, 0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(96, 165, 250, 0.3)' },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.15)',
      '& fieldset': { borderColor: '#60a5fa', borderWidth: '2px' },
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(148, 163, 184, 0.7)',
    '&.Mui-focused': { color: '#60a5fa' },
  },
};

// ── Component ────────────────────────────────────────────────────────
export default function Home() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handler = () => setShowScroll(window.scrollY < 100);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 } }}>
      {/* ═══════════ HERO ═══════════ */}
      <Box
        component="section"
        id="home"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: { xs: 12, md: 0 },
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div custom={0} variants={fadeUp}>
            <Typography
              variant="body2"
              sx={{
                color: '#60a5fa',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                mb: 2,
                fontSize: '0.8rem',
              }}
            >
              Hi, my name is
            </Typography>
          </motion.div>

          <motion.div custom={1} variants={fadeUp}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #e2e8f0, #60a5fa)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Tony Li.
            </Typography>
          </motion.div>

          <motion.div custom={2} variants={fadeUp}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#64748b',
                mb: 3,
              }}
            >
              I build things for the web.
            </Typography>
          </motion.div>

          <motion.div custom={3} variants={fadeUp}>
            <Typography
              variant="body1"
              sx={{
                color: '#94a3b8',
                maxWidth: 520,
                fontSize: '1.05rem',
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              I like to build cool stuff. Currently looking for internship
              opportunities where I can grow and contribute.
            </Typography>
          </motion.div>

          <motion.div custom={4} variants={fadeUp}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                sx={{
                  borderColor: 'rgba(96, 165, 250, 0.4)',
                  color: '#60a5fa',
                  borderRadius: '12px',
                  px: 3,
                  py: 1.2,
                  fontSize: '0.95rem',
                  '&:hover': {
                    borderColor: '#60a5fa',
                    background: 'rgba(96, 165, 250, 0.08)',
                  },
                }}
              >
                View My Work
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                sx={{
                  borderColor: 'rgba(96, 165, 250, 0.2)',
                  color: '#94a3b8',
                  borderRadius: '12px',
                  px: 3,
                  py: 1.2,
                  fontSize: '0.95rem',
                  '&:hover': {
                    borderColor: 'rgba(96, 165, 250, 0.4)',
                    color: '#e2e8f0',
                    background: 'rgba(96, 165, 250, 0.05)',
                  },
                }}
              >
                Get in Touch
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Box>

      {/* ═══════════ ABOUT ═══════════ */}
      <Box
        component="section"
        id="about"
        sx={{ py: { xs: 10, md: 16 } }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div custom={0} variants={fadeUp}>
            <SectionHeading number="01" title="About Me" />
          </motion.div>

          <Paper
            component={motion.div}
            custom={1}
            variants={fadeUp}
            sx={{ ...glassCard, p: { xs: 4, md: 6 } }}
          >
            <Typography
              variant="body1"
              sx={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}
            >
              I like to build cool stuff. I'm passionate about creating
              beautiful, performant web experiences with modern technologies.
              Currently open to internship opportunities where I can learn, grow,
              and make an impact.
            </Typography>
          </Paper>
        </motion.div>
      </Box>

      {/* ═══════════ PROJECTS ═══════════ */}
      <Box
        component="section"
        id="projects"
        sx={{ py: { xs: 10, md: 16 } }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div custom={0} variants={fadeUp}>
            <SectionHeading number="02" title="Featured Projects" />
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            {projectData.map((project, i) => (
              <motion.div key={project.title} custom={i + 1} variants={fadeUp}>
                <Paper
                  sx={{
                    ...glassCard,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  {/* Gradient accent strip */}
                  <Box
                    sx={{
                      height: 4,
                      background: project.gradient,
                      borderRadius: '20px 20px 0 0',
                    }}
                  />
                  <Box
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#e2e8f0',
                        mb: 1,
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#94a3b8',
                        lineHeight: 1.7,
                        mb: 2,
                        flexGrow: 1,
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2.5 }}>
                      {project.tech.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          sx={{
                            background: 'rgba(96, 165, 250, 0.08)',
                            border: '1px solid rgba(96, 165, 250, 0.12)',
                            color: '#60a5fa',
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            height: 26,
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Button
                        component={Link}
                        href={project.github}
                        target="_blank"
                        startIcon={<GitHubIcon sx={{ fontSize: '1rem !important' }} />}
                        size="small"
                        sx={{
                          color: '#94a3b8',
                          fontSize: '0.8rem',
                          '&:hover': { color: '#e2e8f0' },
                        }}
                      >
                        Code
                      </Button>
                      <Button
                        component={Link}
                        href={project.demo}
                        target="_blank"
                        startIcon={<LaunchIcon sx={{ fontSize: '1rem !important' }} />}
                        size="small"
                        sx={{
                          color: '#94a3b8',
                          fontSize: '0.8rem',
                          '&:hover': { color: '#e2e8f0' },
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
      </Box>

      {/* ═══════════ CONTACT ═══════════ */}
      <Box
        component="section"
        id="contact"
        sx={{ py: { xs: 10, md: 16 }, pb: { xs: 12, md: 20 } }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div custom={0} variants={fadeUp}>
            <SectionHeading number="03" title="Get in Touch" />
          </motion.div>

          <Paper
            component={motion.div}
            custom={1}
            variants={fadeUp}
            sx={{ ...glassCard, p: { xs: 4, md: 6 } }}
          >
            <Typography
              variant="body1"
              sx={{ color: '#94a3b8', mb: 4, fontSize: '1.05rem' }}
            >
              Have a question or want to work together? Send me a message!
            </Typography>

            <Box
              component="form"
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);

                const email = formData.get('email') as string;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  setSnackbar({
                    open: true,
                    message: 'Please enter a valid email address',
                    severity: 'error',
                  });
                  return;
                }

                try {
                  await emailjs.send(
                    'template_contact',
                    'template_1kjdm94',
                    {
                      from_name: formData.get('name'),
                      from_email: email,
                      message: formData.get('message'),
                      to_email: 'tony.lilui@live.com',
                    },
                    'q70Fxa0fZZECYPrQg'
                  );
                  setSnackbar({
                    open: true,
                    message: "Message sent successfully! I'll get back to you soon.",
                    severity: 'success',
                  });
                  form.reset();
                } catch (error) {
                  console.error('Failed to send email:', error);
                  setSnackbar({
                    open: true,
                    message: 'Failed to send message. Please try again later.',
                    severity: 'error',
                  });
                }
              }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 2.5,
                }}
              >
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Your Name"
                  sx={inputSx}
                />
                <TextField
                  required
                  fullWidth
                  name="email"
                  type="email"
                  label="Your Email"
                  sx={inputSx}
                />
              </Box>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="message"
                label="Your Message"
                sx={inputSx}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    borderRadius: '12px',
                    px: 4,
                    py: 1.3,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 20px rgba(96, 165, 250, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      boxShadow: '0 6px 24px rgba(96, 165, 250, 0.3)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Box>

            {/* Social links */}
            <Box
              sx={{
                mt: 5,
                pt: 4,
                borderTop: '1px solid rgba(96, 165, 250, 0.08)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2.5,
              }}
            >
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Or connect with me on
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {[
                  {
                    icon: <GitHubIcon />,
                    href: 'https://github.com/tonylilui',
                  }
                ].map((social) => (
                  <IconButton
                    key={social.href}
                    component={Link}
                    href={social.href}
                    target="_blank"
                    sx={{
                      color: '#64748b',
                      border: '1px solid rgba(96, 165, 250, 0.1)',
                      borderRadius: '12px',
                      width: 42,
                      height: 42,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#60a5fa',
                        borderColor: 'rgba(96, 165, 250, 0.3)',
                        background: 'rgba(96, 165, 250, 0.06)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: '12px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          opacity: showScroll ? 1 : 0,
          y: showScroll ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          pointerEvents: showScroll ? 'auto' : 'none',
        }}
        onClick={() =>
          document
            .getElementById('about')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <KeyboardArrowDownIcon
            sx={{ color: '#60a5fa', fontSize: '2rem', opacity: 0.6 }}
          />
        </motion.div>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(96, 165, 250, 0.5)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </Typography>
      </motion.div>
    </Container>
  );
}

// ── Section Heading Sub-component ────────────────────────────────────
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
      <Typography
        sx={{
          color: '#60a5fa',
          fontFamily: "'Inter', monospace",
          fontSize: '0.85rem',
          fontWeight: 500,
        }}
      >
        {number}.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: '#e2e8f0',
          fontSize: { xs: '1.5rem', md: '1.8rem' },
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          height: '1px',
          background: 'rgba(96, 165, 250, 0.1)',
          maxWidth: 200,
        }}
      />
    </Box>
  );
}
