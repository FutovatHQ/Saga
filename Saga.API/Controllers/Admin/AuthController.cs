using Microsoft.AspNetCore.Mvc;
using Saga.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
namespace Saga.API.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto request)
    {
        var response = await _authService.LoginAsync(request);

        if (response == null)
            return Unauthorized();

        return Ok(response);
    }
}