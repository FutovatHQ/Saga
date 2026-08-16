using Saga.API.Data;
using Saga.API.Interfaces.Admin;
using Saga.API.Models;
using Microsoft.EntityFrameworkCore;
using Saga.API.DTOs.Admin;

namespace Saga.API.Services.Admin
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<AdminResponseDto>> GetAllSagasAsync()
        {
            var sagas = await _context.Sagas.Include(s => s.Chapters).ThenInclude(c => c.Quests).ToListAsync();
            List<AdminResponseDto> adminResponseDtos = new List<AdminResponseDto>();

            for (int i = 0; i < sagas.Count; i++)
            {
                AdminResponseDto adminResponseDto = new AdminResponseDto()
                {
                    SagaDataId = sagas[i].SagaDataId,
                    Name = sagas[i].Name,
                    Category = sagas[i].Category,
                    Description = sagas[i].Description,
                    CompletionBonusPoints = sagas[i].CompletionBonusPoints,
                    Chapters = new List<AdminChapterResponseDto>()
                };

                foreach (var chapter in sagas[i].Chapters)
                {
                    AdminChapterResponseDto adminChapterResponseDto = new AdminChapterResponseDto
                    {
                        ChapterId = chapter.ChapterId,
                        Title = chapter.Title,
                        Content = chapter.Content,
                        RewardPoints = chapter.RewardPoints,
                        Quests = new List<AdminQuestResponseDto>()
                    };
                    foreach (var quest in chapter.Quests)
                    {
                        AdminQuestResponseDto adminQuestResponseDto = new AdminQuestResponseDto
                        {
                            QuestId = quest.QuestId,
                            Title = quest.Title,
                            Content = quest.Content,
                            DocumentationLink = quest.DocumentationLink,
                            VideoLink = quest.VideoLink
                        };
                        adminChapterResponseDto.Quests.Add(adminQuestResponseDto);
                    }
                    adminResponseDto.Chapters.Add(adminChapterResponseDto);
                }

                adminResponseDtos.Add(adminResponseDto);

            }


            return adminResponseDtos;
        }

        public async Task<AdminResponseDto?> GetSagaByIdAsync(int sagaId)
        {
            var saga = await _context.Sagas
                .Include(s => s.Chapters)
                .ThenInclude(c => c.Quests)
                .FirstOrDefaultAsync(s => s.SagaDataId == sagaId);

            if (saga == null)
                return null;

            AdminResponseDto response = new AdminResponseDto
            {
                SagaDataId = saga.SagaDataId,
                Name = saga.Name,
                Category = saga.Category,
                Description = saga.Description,
                CompletionBonusPoints = saga.CompletionBonusPoints,
                Chapters = new List<AdminChapterResponseDto>()
            };

            foreach (var chapter in saga.Chapters)
            {
                AdminChapterResponseDto chapterDto = new AdminChapterResponseDto
                {
                    ChapterId = chapter.ChapterId,
                    Title = chapter.Title,
                    Content = chapter.Content,
                    RewardPoints = chapter.RewardPoints,
                    Quests = new List<AdminQuestResponseDto>()
                };

                foreach (var quest in chapter.Quests)
                {
                    chapterDto.Quests.Add(new AdminQuestResponseDto
                    {
                        QuestId = quest.QuestId,
                        Title = quest.Title,
                        Content = quest.Content,
                        DocumentationLink = quest.DocumentationLink,
                        VideoLink = quest.VideoLink
                    });
                }

                response.Chapters.Add(chapterDto);
            }

            return response;
        }

        public async Task UpdateSagaAsync(int sagaId, AdminResponseDto request)
        {
            var saga = await _context.Sagas
                .Include(s => s.Chapters)
                .ThenInclude(c => c.Quests)
                .FirstOrDefaultAsync(s => s.SagaDataId == sagaId);

            if (saga == null)
                throw new Exception("Saga not found.");

            saga.Name = request.Name;
            saga.Category = request.Category;
            saga.Description = request.Description;
            saga.CompletionBonusPoints = request.CompletionBonusPoints;

            _context.Chapter.RemoveRange(saga.Chapters);

            saga.Chapters.Clear();

            foreach (var chapterDto in request.Chapters)
            {
                Chapter chapter = new Chapter
                {
                    Title = chapterDto.Title,
                    Content = chapterDto.Content,
                    RewardPoints = chapterDto.RewardPoints
                };

                foreach (var questDto in chapterDto.Quests)
                {
                    Quest quest = new Quest
                    {
                        Title = questDto.Title,
                        Content = questDto.Content,
                        DocumentationLink = questDto.DocumentationLink,
                        VideoLink = questDto.VideoLink
                    };

                    chapter.Quests.Add(quest);
                }

                saga.Chapters.Add(chapter);
            }

            await _context.SaveChangesAsync();
        }

        public async Task CreateSagaAsync(AdminCreateSagaRequestDto request)
        {
            SagaData saga = new SagaData
            {
                Name = request.Name,
                Category = request.Category,
                Description = request.Description,
                CompletionBonusPoints = request.CompletionBonusPoints
            };

            _context.Sagas.Add(saga);

            await _context.SaveChangesAsync();
        }

        public async Task CreateChapterAsync(int sagaId, AdminCreateChapterRequestDto request)
        {
            var saga = await _context.Sagas
                .FirstOrDefaultAsync(x => x.SagaDataId == sagaId);

            if (saga == null)
                throw new Exception("Saga not found.");

            Chapter chapter = new Chapter
            {
                SagaDataId = sagaId,
                Title = request.Title,
                Content = request.Content,
                RewardPoints = request.RewardPoints
            };

            _context.Chapter.Add(chapter);

            await _context.SaveChangesAsync();
        }

        public async Task CreateQuestAsync(int chapterId, AdminCreateQuestRequestDto request)
        {
            var chapter = await _context.Chapter
                .FirstOrDefaultAsync(x => x.ChapterId == chapterId);

            if (chapter == null)
                throw new Exception("Chapter not found.");

            Quest quest = new Quest
            {
                ChapterId = chapterId,
                Title = request.Title,
                Content = request.Content,
                DocumentationLink = request.DocumentationLink,
                VideoLink = request.VideoLink
            };

            _context.Quest.Add(quest);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteSagaAsync(int sagaId)
        {
            var saga = await _context.Sagas
                .Include(s => s.Chapters)
                .ThenInclude(c => c.Quests)
                .FirstOrDefaultAsync(s => s.SagaDataId == sagaId);

            if (saga == null)
                throw new Exception("Saga not found.");

            _context.Sagas.Remove(saga);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteChapterAsync(int chapterId)
        {
            var chapter = await _context.Chapter
                .Include(c => c.Quests)
                .FirstOrDefaultAsync(c => c.ChapterId == chapterId);

            if (chapter == null)
                throw new Exception("Chapter not found.");

            _context.Chapter.Remove(chapter);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuestAsync(int questId)
        {
            var quest = await _context.Quest
                .FirstOrDefaultAsync(x => x.QuestId == questId);

            if (quest == null)
                throw new Exception("Quest not found.");

            _context.Quest.Remove(quest);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateChapterAsync(int chapterId, AdminCreateChapterRequestDto request)
        {
            var chapter = await _context.Chapter
                .FirstOrDefaultAsync(x => x.ChapterId == chapterId);

            if (chapter == null)
                throw new Exception("Chapter not found.");

            chapter.Title = request.Title;
            chapter.Content = request.Content;
            chapter.RewardPoints = request.RewardPoints;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateQuestAsync( int questId,AdminCreateQuestRequestDto request)
        {
            var quest = await _context.Quest
                .FirstOrDefaultAsync(x => x.QuestId == questId);

            if (quest == null)
                throw new Exception("Quest not found.");

            quest.Title = request.Title;
            quest.Content = request.Content;
            quest.DocumentationLink = request.DocumentationLink;
            quest.VideoLink = request.VideoLink;

            await _context.SaveChangesAsync();
        }
    }
}
