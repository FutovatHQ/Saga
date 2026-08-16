using Microsoft.EntityFrameworkCore;
using Saga.API.Data;
using Saga.API.Interfaces;

namespace Saga.API.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuthService(
        ApplicationDbContext context,
        JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request)
    {
        Console.WriteLine("--------------------------------");
        Console.WriteLine($"Request Email    : '{request.Email}'");
        Console.WriteLine($"Request Password : '{request.Password}'");

        var admin = await _context.Admins.FirstOrDefaultAsync(
            a => a.Email == request.Email);

        if (admin == null)
        {
            Console.WriteLine("❌ Admin NOT FOUND");
            return null;
        }

        Console.WriteLine($"DB Email         : '{admin.Email}'");
        Console.WriteLine($"DB Password      : '{admin.PasswordHash}'");

        if (admin.PasswordHash != request.Password)
        {
            Console.WriteLine("❌ Password Mismatch");
            return null;
        }

        Console.WriteLine("✅ Login Success");

        var token = _jwtService.GenerateToken(admin);

        return new LoginResponseDto
        {
            Token = token
        };
    }
}