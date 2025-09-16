import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Iniciando script de demonstração...\n')

  try {
    console.log('👤 Criando usuários...')
    const user1 = await prisma.user.create({
      data: {
        email: 'joao@email.com',
        password: 'senha123',
        name: 'João Silva'
      }
    })

    const user2 = await prisma.user.create({
      data: {
        email: 'maria@email.com',
        password: 'senha456',
        name: 'Maria Santos'
      }
    })

    console.log(`✅ Usuários criados: ${user1.name} e ${user2.name}\n`)

    console.log('📚 Criando livros...')
    const book1 = await prisma.book.create({
      data: {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        genre: 'Romance',
        condition: 'Usado - Bom',
        description: 'Clássico da literatura brasileira'
      }
    })

    const book2 = await prisma.book.create({
      data: {
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        genre: 'Infantil',
        condition: 'Novo',
        description: 'Livro infantil em perfeito estado'
      }
    })

    console.log(`✅ Livros criados: "${book1.title}" e "${book2.title}"\n`)

    console.log('🎁 Criando doações...')
    const donation1 = await prisma.donation.create({
      data: {
        userId: user1.id,
        bookId: book1.id,
        status: 'Disponível'
      }
    })

    const donation2 = await prisma.donation.create({
      data: {
        userId: user1.id,
        bookId: book2.id,
        status: 'Disponível'
      }
    })

    console.log('✅ Doações criadas com sucesso!\n')

    console.log('📝 Criando solicitação...')
    const request1 = await prisma.request.create({
      data: {
        userId: user2.id,
        bookId: book1.id,
        donationId: donation1.id,
        message: 'Gostaria muito de ler este clássico!',
        status: 'Pendente'
      }
    })

    console.log('✅ Solicitação criada!\n')

    console.log('🔍 Buscando todos os dados...\n')

    const usersWithDonations = await prisma.user.findMany({
      include: {
        donations: {
          include: {
            book: true
          }
        },
        requests: {
          include: {
            book: true
          }
        }
      }
    })

    console.log('👥 USUÁRIOS E SUAS ATIVIDADES:')
    usersWithDonations.forEach(user => {
      console.log(`\n📧 ${user.name} (${user.email})`)
      console.log(`   Doações: ${user.donations.length}`)
      user.donations.forEach(donation => {
        console.log(`   - Doou: "${donation.book.title}" (${donation.status})`)
      })
      console.log(`   Solicitações: ${user.requests.length}`)
      user.requests.forEach(request => {
        console.log(`   - Solicitou: "${request.book.title}" (${request.status})`)
      })
    })

    console.log('\n🎁 DOAÇÕES DISPONÍVEIS:')
    const availableDonations = await prisma.donation.findMany({
      where: {
        status: 'Disponível'
      },
      include: {
        book: true,
        user: true,
        requests: {
          include: {
            user: true
          }
        }
      }
    })

    availableDonations.forEach(donation => {
      console.log(`\n📖 "${donation.book.title}" por ${donation.book.author}`)
      console.log(`   Condição: ${donation.book.condition}`)
      console.log(`   Doador: ${donation.user.name}`)
      console.log(`   Solicitações: ${donation.requests.length}`)
      donation.requests.forEach(request => {
        console.log(`   - ${request.user.name}: "${request.message}" (${request.status})`)
      })
    })

    console.log('\n✨ Script executado com sucesso!')

  } catch (error) {
    console.error('❌ Erro durante a execução:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })